import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import LayoutWebsite from "../components/layouts/LayoutWebsite";
import VocalizeController from "../pages/voicalize/VocalizeController";
import BuyCreditController from "../pages/buy_credit/BuyCreditController";
import ProfileController from "../pages/profile/ProfileController";
import HistoryController from "../pages/history/HistoryController";
import PrivacyController from "../pages/privacy/PrivacyController";
import TermsController from "../pages/terms/TermsController";
import PricingPlansController from "../pages/pricing_plans/PricingPlansController";
import PaymentHistoryController from "../pages/payment_history/PaymentHistoryController";
import SignInController from "../pages/signin/SignInController";
import SignUpController from "../pages/signup/SignUpController";
import PrivateRouter from "../components/PrivateRouter";
import NotFound from "../components/NotFound";
import MaterialVideoController from "../pages/material_video/MaterialVideoController";

const Router = () => {
  const context: any = useCoursesContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<VocalizeController />} />
          <Route
            path='buy-credits'
            element={
              <PrivateRouter user={context.state.user}>
                <BuyCreditController />
              </PrivateRouter>
            }
          />
          <Route
            path='profile'
            element={
              <PrivateRouter user={context.state.user}>
                <ProfileController />
              </PrivateRouter>
            }
          />
          <Route path='history' element={<HistoryController />} />
          <Route path='privacy' element={<PrivacyController />} />
          <Route path='terms' element={<TermsController />} />
          <Route path='material-video' element={<MaterialVideoController />} />
          <Route path='pricing-plans' element={<PricingPlansController />} />
          <Route
            path='payment-history'
            element={
              <PrivateRouter user={context.state.user}>
                <PaymentHistoryController />
              </PrivateRouter>
            }
          />
        </Route>
        <Route path='signin' element={<SignInController />} />
        <Route path='auth/callback' element={<SignUpController />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
