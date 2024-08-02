import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Book from "../pages/Book/Book";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Book/>
            }
        ]
    }
]);

export default router;