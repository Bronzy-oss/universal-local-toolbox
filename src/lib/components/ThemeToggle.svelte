<script>
  import Dropdown from "./Dropdown.svelte";
  import { themePreference } from "../stores/theme.js";

  const options = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
</script>

<Dropdown
  label="Appearance"
  {options}
  value={$themePreference}
  onChange={(value) => themePreference.set(value)}
/>
