/**
 * Returns a JS script string to inject into published sites.
 * The script intercepts all form submissions on the page,
 * collects the form data, and POSTs it to the /api/lead endpoint.
 */
export function getFormHandlerScript(projectId: number, apiBase: string): string {
  return `
(function() {
  var PROJECT_ID = ${JSON.stringify(projectId)};
  var API_URL = ${JSON.stringify(apiBase + "/api/lead")};

  document.addEventListener("submit", function(e) {
    var form = e.target;
    if (!form || form.tagName !== "FORM") return;
    e.preventDefault();

    var fields = {};
    var inputs = form.querySelectorAll("input, textarea, select");
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      var name = el.name || el.placeholder || el.type || ("field_" + i);
      if (el.type === "submit" || el.type === "button" || el.type === "hidden") continue;
      if (el.type === "checkbox") {
        fields[name] = el.checked ? "Yes" : "No";
      } else if (el.type === "radio") {
        if (el.checked) fields[name] = el.value;
      } else {
        fields[name] = el.value || "";
      }
    }

    var btn = form.querySelector("[type=submit], button:not([type])");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: PROJECT_ID,
        fields: fields,
        source: window.location.href
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.ok) {
        form.innerHTML = '<div style="padding:20px;text-align:center;color:#16a34a;font-weight:600;">Thank you! Your message has been sent.</div>';
      } else {
        showError(form, btn);
      }
    })
    .catch(function() {
      showError(form, btn);
    });
  }, true);

  function showError(form, btn) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Send";
    }
    var existing = form.querySelector(".sb-form-error");
    if (existing) existing.remove();
    var msg = document.createElement("div");
    msg.className = "sb-form-error";
    msg.style.cssText = "padding:8px 12px;margin-top:8px;border-radius:6px;background:#fef2f2;color:#dc2626;font-size:14px;text-align:center;";
    msg.textContent = "Something went wrong. Please try again.";
    form.appendChild(msg);
    setTimeout(function() { msg.remove(); }, 5000);
  }
})();
`.trim();
}
