param(
    [string]$HostIp = "47.236.5.11",
    [string]$RemoteUser = "deploy",
    [string]$RemotePath = "/home/deploy/apps/kakis_ai_staging",
    [string]$Domain = "kakis.ai",
    [string]$WebGroup = "www-data",
    [ValidateSet("npm", "bun", "none")]
    [string]$BuildTool = "npm",
    [switch]$SkipBuild,
    [switch]$UseScpOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Info([string]$Message) {
    Write-Host "[deploy] $Message" -ForegroundColor Cyan
}

function Test-Command([string]$Name) {
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$distPath = Join-Path $projectRoot "dist"
$remote = "$RemoteUser@$HostIp"

Write-Info "Project root: $projectRoot"
Write-Info "Target: ${remote}:$RemotePath"

if (-not $SkipBuild) {
    Write-Info "Building frontend with $BuildTool"

    if ($BuildTool -eq "npm") {
        if (-not (Test-Command "npm")) {
            throw "npm is not installed or not in PATH."
        }
        & npm run build
    }
    elseif ($BuildTool -eq "bun") {
        if (-not (Test-Command "bun")) {
            throw "bun is not installed or not in PATH."
        }
        & bun run build
    }
    else {
        Write-Info "Build skipped by BuildTool=none"
    }
}
else {
    Write-Info "Build skipped by -SkipBuild"
}

if (-not (Test-Path $distPath)) {
    throw "dist folder not found. Build first or check project path."
}

Write-Info "Ensuring remote deploy directory exists"
& ssh $remote "sudo mkdir -p $RemotePath; sudo chown -R $RemoteUser`:$RemoteUser $RemotePath"

$didSync = $false
if (-not $UseScpOnly -and (Test-Command "rsync")) {
    Write-Info "Uploading with rsync"
    & rsync -avz --delete "$distPath/" "$remote`:$RemotePath/"
    $didSync = $true
}

if (-not $didSync) {
    if (-not (Test-Command "scp")) {
        throw "Neither rsync nor scp is available in PATH."
    }

    Write-Info "Uploading with scp fallback"
    & scp -r "$distPath/." "$remote`:$RemotePath/"
}

Write-Info "Fixing permissions and reloading Nginx"
$remoteFix = @"
sudo chown -R ${RemoteUser}:${RemoteUser} $RemotePath
sudo chmod 755 /home /home/$RemoteUser /home/$RemoteUser/apps
sudo chmod -R u=rwX,go=rX $RemotePath
if getent group $WebGroup >/dev/null 2>&1; then
    sudo chgrp -R $WebGroup $RemotePath
    sudo chmod -R g+rX $RemotePath
fi
sudo nginx -t
sudo systemctl reload nginx
"@
$remoteFix = $remoteFix -replace "`r", ""
& ssh $remote $remoteFix

Write-Info "Running quick health checks"
$indexHtmlPath = Join-Path $distPath "index.html"
$firstJsAsset = Select-String -Path $indexHtmlPath -Pattern "assets/[^`" ]+\.js" -AllMatches |
    ForEach-Object { $_.Matches } |
    Select-Object -First 1 |
    ForEach-Object { $_.Value }

if ([string]::IsNullOrWhiteSpace($firstJsAsset)) {
    Write-Info "Could not detect JS asset from dist/index.html. Skipping asset health check."
    $homeStatus = (& ssh $remote "curl -sS -L -o /dev/null -w '%{http_code}' https://$Domain/").Trim()
    Write-Info "Home status: $homeStatus"
    if ($homeStatus -notmatch '^[23][0-9][0-9]$') {
        throw "Health check failed for https://$Domain/ (status $homeStatus)."
    }
}
else {
    $homeStatus = (& ssh $remote "curl -sS -L -o /dev/null -w '%{http_code}' https://$Domain/").Trim()
    $assetStatus = (& ssh $remote "curl -sS -L -o /dev/null -w '%{http_code}' https://$Domain/$firstJsAsset").Trim()
    Write-Info "Home status: $homeStatus"
    Write-Info "Asset status: $assetStatus ($firstJsAsset)"

    if ($homeStatus -notmatch '^[23][0-9][0-9]$') {
        throw "Health check failed for https://$Domain/ (status $homeStatus)."
    }
    if ($assetStatus -notmatch '^[23][0-9][0-9]$') {
        throw "Health check failed for https://$Domain/$firstJsAsset (status $assetStatus)."
    }
}

Write-Host ""
Write-Host "Deployment completed." -ForegroundColor Green
Write-Host "Open: https://$Domain" -ForegroundColor Green
Write-Host ""
Write-Host "Examples:" -ForegroundColor Yellow
Write-Host "  .\deploy.ps1"
Write-Host "  .\deploy.ps1 -BuildTool bun"
Write-Host "  .\deploy.ps1 -SkipBuild"
Write-Host "  .\deploy.ps1 -UseScpOnly"
