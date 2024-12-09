export default function useTheme() {
  const changeTheme = () => {
    let currentTheme = document
      .querySelector("html")
      .getAttribute("data-theme");
    if (currentTheme == "cmyk") {
      document.querySelector("html").setAttribute("data-theme", "dracula");
      localStorage.setItem("data-theme", "dracula");
    } else {
      document.querySelector("html").setAttribute("data-theme", "cmyk");
      localStorage.setItem("data-theme", "cmyk");
    }
  };
  return { changeTheme };
}
