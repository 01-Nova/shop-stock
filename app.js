const supabaseUrl = "https://tidlwmprwuursacrxeqn.supabase.co";
const supabaseKey = "sb_publishable_X9Ur5rZE14CtdyorPQtO0A_rlfh5p0U";

const db = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadAvailable() {
  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("available", true);

  const list = document.getElementById("list");

  if (error || !data) {
    list.innerHTML = "Failed to load products.";
    return;
  }

  list.innerHTML = "";

  let grouped = {};

  data.forEach(p => {
    if (!grouped[p.brand]) grouped[p.brand] = [];
    grouped[p.brand].push(p.name);
  });

  for (let brand in grouped) {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${brand}</h3>` + grouped[brand].join("<br>");
    list.appendChild(div);
  }
}

loadAvailable();
