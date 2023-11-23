import { 
  createBrowserRouter,
  Route,  
  createRoutesFromElements, 
  RouterProvider
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// pages // help
import Faq from "./pages/help/Faq";
import Contact, { contactAction } from "./pages/help/Contact";

// pages // careers
import Careers, { careersDataLoader } from "./pages/careers/Careers";
import CareerDetails, { careerDetailsLoader } from "./pages/careers/CareerDetails";

// layouts
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
import CareersLayout from "./layouts/CareersLayout";
import CareersError from "./pages/careers/CareersError";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />}/>
    <Route path="about" element={<About />}/>
    <Route path="help" element={<HelpLayout />}>
      <Route path="faq" element={<Faq/>} />
      <Route path="contact" element={<Contact/>} action={contactAction} />
    </Route>

    <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
        <Route 
          index 
          element={<Careers />} 
          loader={careersDataLoader}
        />
        <Route
          path=":id"
          element={<CareerDetails />}
          loader={careerDetailsLoader}
        />
      </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
  )
)
function App() {
  return (

    <RouterProvider router={router} />

  );
}

export default App
