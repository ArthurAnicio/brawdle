import { BrowserRouter, Routes , Route } from "react-router-dom";
import Brawldle from "./pages/Brawldle";

function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Brawldle} />
            </Routes>
        </BrowserRouter>
    );
}

export default WebRoutes;