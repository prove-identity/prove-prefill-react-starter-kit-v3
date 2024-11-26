//package import 
import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import {
  Box,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
//module import
import ReviewInfo from "./pages/ReviewInfo";
import SMSWaitingPage from "./pages/SMSWaitingPage";
import ChallengePage from "./pages/ChallengePage";
import OtpEntry from "./pages/OtpEntry";
import Logo from "./components/Logo";
import ResultPage from "./components/ResultPage";
import LangToggle from "./components/LangToggle";
import ThemeToggle from "./components/ThemeToggle";
import ProveClientSdk from "./services/prove-client-sdk";
import { AppEnv, } from "./services/prove-service/(definitions)"
import { useAuth } from "./contexts/AuthProvider";
import { useDevice } from "./contexts/DeviceProvider";
import { NAV_HEIGHT } from "./constants";

const AppContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;

const MainContainer = styled(Box)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainContent = styled(Box)(({ theme }) => ({
  flex: "0 0 auto",
  margin: "auto",
  borderRadius: "16px",
  width: "100%",
  minHeight: "320px",
  height: "100%",
  marginTop: "20px",
  [theme.breakpoints.up("sm")]: {
    width: "360px",
  },
}));

const CompWrapper = styled("main")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  width: 100%;
  margin: 0;
  margin-top: 10px;
  flex-grow: 1;
  padding: 0 1.8rem;
`;

const Nav = styled("nav")`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${NAV_HEIGHT};
`;

const NavLogo = styled("span")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.8rem;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.3px;
  img {
    width: 74px;
  }
`;

const NavIcons = styled("span")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Layout = ({ children }: { children: any }) => {
  return (
    <MainContent className="fadeIn main-container">
      <Nav>
        <NavLogo>
          <Logo />
        </NavLogo>
        <NavIcons>
          <LangToggle />
          <ThemeToggle />
        </NavIcons>
      </Nav>
      <div id="animationWrapper">{children}</div>
    </MainContent>
  );
};

const App = () => {
  const { t } = useTranslation();
  const { setAppEnv, } = useAuth();
  const { setIsMobile, } = useDevice();

  const [error, setError] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const initApp = async () => {
    try {
      const proveAuthManager = new ProveClientSdk();
      setIsMobile(proveAuthManager.authCheck());
      setAppEnv(import.meta.env.REACT_APP_ENV === AppEnv.PRODUCTION ? AppEnv.PRODUCTION : AppEnv.SANDBOX);
    } catch (e: any) {
      //default to desktop if sdk fails 
      setIsMobile(false);
    } finally {
      setLoading(false);
      setReady(true);
    }
  }

  useEffect(() => {
    initApp();
  }, []);

  return (
    <AppContainer className={"main-container"}>
      <MainContainer>
        {loading ? (
          <Box sx={{ background: "transparent", zIndex: 2147483648 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CompWrapper>
            <Layout>
              {ready && !error ? (
                <Routes>
                  <Route
                    path="review"
                    element={
                      <ReviewInfo
                      />
                    }
                  />
                  <Route path="sms-otp" element={
                    <OtpEntry />
                  } />
                  <Route path="sms-waiting" element={
                    <SMSWaitingPage />
                  } />
                  <Route path="sms-result" element={
                    <ResultPage status="success" />
                  } />
                  <Route path="verify-success" element={
                    <ResultPage status="success" />
                  } />
                  <Route path="verify-failure" element={
                    <ResultPage status="failure" />
                  } />
                  <Route path="*" element={
                    <ChallengePage />
                  } />
                </Routes>
              ) : (
                <MainContent display="flex">
                  <Typography
                    variant="caption"
                    textAlign="center"
                    sx={{
                      lineHeight: "32px",
                      fontSize: "24px",
                      marginBottom: "32px",
                      marginTop: "32px",
                      p: 1,
                    }}
                  >
                    {error ||
                      t('global.genericError')
                    }
                  </Typography>
                </MainContent>
              )}
            </Layout>
          </CompWrapper>
        )}
      </MainContainer>
    </AppContainer>
  );
};

export default App;
