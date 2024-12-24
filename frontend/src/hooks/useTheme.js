export default function useTheme() {
  // This Hook is for changing theme of site
  // Theme information set last time is set in local storage
  // when page loads fresh it gets the details from the local storage
  // then later sets and unsets accordinglt

  const changeTheme = () => {
    let currentTheme = document
      .querySelector("html")
      .getAttribute("data-theme");
    //checking for current theme
    if (currentTheme == "cmyk") {
      document.querySelector("html").setAttribute("data-theme", "dracula");
      localStorage.setItem("data-theme", "dracula");
      // setting items in local storage
    } else {
      document.querySelector("html").setAttribute("data-theme", "cmyk");
      localStorage.setItem("data-theme", "cmyk");
    }
  };
  return { changeTheme };
}
