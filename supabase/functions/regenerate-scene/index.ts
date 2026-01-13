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
    const { sceneNumber, originalDescription, style, storyContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a creative story development AI. Your task is to regenerate a single scene for a storyboard, making it fresh and different while maintaining consistency with the overall story.

Given the story context and the scene number, create a new version of this scene with:
1. A different approach to the same story beat
2. Fresh visual descriptions
3. Alternative dialogue where applicable
4. Maintaining the narrative flow

Style preference: ${style || 'cinematic'}

Respond with a single scene object.`;

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
          { 
            role: "user", 
            content: `Story context: "${storyContext}"\n\nRegenerate scene ${sceneNumber}. Original scene idea: "${originalDescription}"\n\nCreate a fresh, alternative version of this scene.` 
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_scene",
              description: "Create a single story scene",
              parameters: {
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
          }
        ],
        tool_choice: { type: "function", function: { name: "create_scene" } }
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
      return new Response(JSON.stringify({ error: "Failed to regenerate scene" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call response from AI");
    }

    const sceneData = JSON.parse(toolCall.function.arguments);
    // Ensure the scene number is preserved
    sceneData.sceneNumber = sceneNumber;

    return new Response(JSON.stringify(sceneData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("regenerate-scene error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
