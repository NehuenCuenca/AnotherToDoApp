import { useQuasar } from "quasar";

const useUserSettings = () => {
  const $q = useQuasar();

  return {
    // State

    // Computed
    isDarkModeActive: () => console.log($q.dark.isActive),
    setDarkMode: () => $q.dark.set(true),
    toggleTheme: () => $q.dark.toggle(),
    // Methods
    //Vuex
  };
};

export default useUserSettings;
