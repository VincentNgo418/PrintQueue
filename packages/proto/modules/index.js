export function onDarkModeToggle(event) {

    const body = event.currentTarget;
    const checked = event.detail.checked;
    body.classList.toggle("dark-mode",checked);

}
 