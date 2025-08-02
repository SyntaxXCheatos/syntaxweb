const OWNER_PASSWORD = "People1212@@";

let offsets = [
  { name: "UWorld", value: "0x173AF320" },
  { name: "game_instance", value: "0x250" },
  { name: "local_players", value: "0x38" },
  { name: "player_controller", value: "0x30" },
  { name: "local_pawn", value: "0x350" },
  { name: "game_state", value: "0x1D8" },
  { name: "pawn_private", value: "0x320" },
  { name: "player_state", value: "0x2C8" },
  { name: "team_index", value: "0x1291" },
  { name: "platform", value: "0x430" },
  { name: "player_name", value: "0xB40" },
  { name: "player_array", value: "0x2C0" },
  { name: "root_component", value: "0x1B0" },
  { name: "relative_location", value: "0x138" },
  { name: "comp2world", value: "0x1e0" },
  { name: "camera_manager", value: "0x360" },
  { name: "loc", value: "0x180" },
  { name: "rot", value: "0x190" },
  { name: "bonearray", value: "0x5E8" },
  { name: "mesh", value: "0x328" },
  { name: "weapondata", value: "0x548" },
  { name: "currentweapon", value: "0xaf0" },
  { name: "bonearraycache", value: "0x5F8" },
  { name: "HABANERO_COMPONENT", value: "0xA80" },
  { name: "RANKED_PROGRESS", value: "0xd0" },
  { name: "health", value: "0xe60" },
  { name: "maxhealth", value: "0xe60" },
  { name: "bRenderCustomDepth", value: "0x58c" },
  { name: "CustomDepthStencilValue", value: "0x890" },
  { name: "current_ammo", value: "0x4e8" },
  { name: "max_ammo", value: "0xF74" },
  { name: "b_is_dying", value: "0x728" },
  { name: "targetedfortpawn", value: "0x18d0" },
  { name: "vehicleoffset", value: "0x430" },
  { name: "AdditionalAimOffset", value: "0x3168" }
];

let isOwner = false;
let editing = false;

const tabs = document.querySelectorAll("nav button.tab-btn");
const sections = document.querySelectorAll(".tab-content");

const loginSection = document.getElementById("login");
const offsetsSection = document.getElementById("offsets");
const spoofersSection = document.getElementById("spoofers");
const toolsSection = document.getElementById("tools");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const guestBtn = document.getElementById("guest-btn");
const loginMsg = document.getElementById("login-msg");

const offsetsList = document.getElementById("offsets-list");
const editOffsetsBtn = document.getElementById("edit-offsets-btn");
const saveOffsetsBtn = document.getElementById("save-offsets-btn");
const copyAllBtn = document.getElementById("copy-all-btn");

const downloadCheatLink = document.getElementById("download-cheat");

function switchTab(tabName) {
  tabs.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
    btn.disabled = false;
  });
  sections.forEach((sec) => {
    sec.classList.toggle("hidden", sec.id !== tabName);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }, () => {
    alert("Failed to copy.");
  });
}

function renderOffsets() {
  offsetsList.innerHTML = "";
  offsets.forEach((offset, index) => {
    const div = document.createElement("div");
    div.className = "offset-item";

    if (editing && isOwner) {
      const nameInput = document.createElement("input");
      nameInput.value = offset.name;
      nameInput.oninput = (e) => {
        offsets[index].name = e.target.value;
      };

      const valueInput = document.createElement("input");
      valueInput.value = offset.value;
      valueInput.oninput = (e) => {
        offsets[index].value = e.target.value;
      };

      div.appendChild(nameInput);
      div.appendChild(valueInput);
    } else {
      const textsDiv = document.createElement("div");
      textsDiv.className = "offset-texts";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = offset.name;

      const valueSpan = document.createElement("span");
      valueSpan.textContent = offset.value;

      textsDiv.appendChild(nameSpan);
      textsDiv.appendChild(valueSpan);
      div.appendChild(textsDiv);

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "Copy";
      copyBtn.onclick = () => copyText(`${offset.name} = ${offset.value};`);
      div.appendChild(copyBtn);
    }

    offsetsList.appendChild(div);
  });
}

copyAllBtn.onclick = () => {
  let allText = offsets.map(o => `${o.name} = ${o.value};`).join("\n");
  copyText(allText);
};

loginBtn.onclick = () => {
  if (passwordInput.value === OWNER_PASSWORD) {
    isOwner = true;
    loginMsg.textContent = "Logged in as owner.";
    enableTabs();
    switchTab("offsets");
    renderOffsets();
    editing = false;
    toggleEditButtons();
  } else {
    loginMsg.textContent = "Incorrect password.";
  }
};

guestBtn.onclick = () => {
  isOwner = false;
  loginMsg.textContent = "Logged in as guest.";
  enableTabs();
  switchTab("offsets");
  renderOffsets();
  editing = false;
  toggleEditButtons();
};

function enableTabs() {
  tabs.forEach((btn) => {
    btn.disabled = false;
  });
}

function toggleEditButtons() {
  if (isOwner) {
    editOffsetsBtn.classList.toggle("hidden", editing);
    saveOffsetsBtn.classList.toggle("hidden", !editing);
  } else {
    editOffsetsBtn.classList.add("hidden");
    saveOffsetsBtn.classList.add("hidden");
  }
}

editOffsetsBtn.onclick = () => {
  if (!isOwner) return;
  editing = true;
  toggleEditButtons();
  renderOffsets();
};

saveOffsetsBtn.onclick = () => {
  editing = false;
  toggleEditButtons();
  renderOffsets();
  alert("Offsets updated for all guests!");
};

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    switchTab(btn.dataset.tab);
  });
});

function init() {
  switchTab("login");
  tabs.forEach((btn) => {
    if (btn.dataset.tab !== "login") btn.disabled = true;
  });
  renderOffsets();
  toggleEditButtons();
}

init();
