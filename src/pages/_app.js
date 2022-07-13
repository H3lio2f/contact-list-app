import Slide  from "@material-ui/core/Slide";
import { SnackbarProvider } from "notistack";
import GlobalStyle from "./../styles/globalStyles";
import "react-phone-input-2/lib/style.css";
import { AuthProvider } from "../utils/contexts/auth";
import { GlobalProvider } from "../utils/contexts/global";

function MyApp({ Component, pageProps }) {
  return ( 
    <>
      <AuthProvider>
        <GlobalProvider>
        <SnackbarProvider
            maxSnack={3}
            color="#fff"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
          >
          <GlobalStyle />
          <Component {...pageProps} />
          </SnackbarProvider>
        </GlobalProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
