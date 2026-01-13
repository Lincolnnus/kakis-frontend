import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, style, characters } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a creative story development AI for a storyboard creation tool. Your task is to expand short story descriptions into detailed, visual scenes suitable for storyboarding.

When given a brief story idea, you should:
1. Create a compelling narrative arc with clear scenes
2. Each scene should have a vivid visual description suitable for illustration
3. Include character actions, emotions, and key dialogue
4. Consider visual storytelling elements like setting, lighting, and mood

Respond with a JSON object containing:
- "summary": A brief 1-2 sentence summary of the expanded story
- "scenes": An array of scene objects, each with:
  - "sceneNumber": Sequential number starting from 1
  - "heading": Scene heading (e.g., "INT. FOREST CLEARING - NIGHT")
  - "location": The location name
  - "timeOfDay": "Day", "Night", "Dawn", "Dusk", etc.
  - "description": Detailed visual description (2-3 sentences)
  - "characters": Array of character names in the scene
  - "dialogue": Array of { "character": "Name", "text": "Dialogue" } objects
  - "lighting": Lighting mood description

Style preference: ${style || 'cinematic'}
${characters?.length > 0 ? `Characters to include: ${characters.join(', ')}` : ''}

Always generate 3-6 scenes that tell a complete story arc.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Expand this story idea into detailed scenes: "${description}"` }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_story_scenes",
              description: "Create detailed story scenes from a brief description",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "Brief summary of the expanded story" },
                  scenes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sceneNumber: { type: "number" },
                        heading: { type: "string" },
                        location: { type: "string" },
                        timeOfDay: { type: "string" },
                        description: { type: "string" },
                        characters: { type: "array", items: { type: "string" } },
                        dialogue: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              character: { type: "string" },
                              text: { type: "string" }
                            },
                            required: ["character", "text"]
                          }
                        },
                        lighting: { type: "string" }
                      },
                      required: ["sceneNumber", "heading", "location", "timeOfDay", "description", "characters", "dialogue", "lighting"]
                    }
                  }
                },
                required: ["summary", "scenes"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_story_scenes" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to generate story" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call response from AI");
    }

    const storyData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(storyData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("expand-story error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
