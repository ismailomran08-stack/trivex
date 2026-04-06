const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn("WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Skipping data fetch.");
    return;
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "main")
    .single();

  if (error) {
    console.warn("WARNING: Could not fetch site_content row:", error.message);
    return;
  }

  if (!data) {
    console.warn("WARNING: No row found in site_content with id='main'. Keeping existing site-data.json.");
    return;
  }

  fs.writeFileSync("site-data.json", JSON.stringify(data.content, null, 2) + "\n");
  console.log("site-data.json written successfully.");
}

main().catch((err) => {
  console.error("Build script error:", err);
  process.exit(1);
});
