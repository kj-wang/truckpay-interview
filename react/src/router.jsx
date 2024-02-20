import { Routes, createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Patients from "./views/Patients";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import PatientsForm from "./views/PatientsForm";
import Invoices from "./views/Invoices";
import InvoicesForm from "./views/InvoicesForm";
import Charts from "./views/Charts";
import ChartsForm from "./views/ChartsForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/patients" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/patients',
                element: <Patients />
            },
            {
                path: '/patients/new',
                element: <PatientsForm key="patientCreate"/>
            },
            {
                path: '/patients/:id',
                element: <PatientsForm key="patientUpdate"/>
            },
            {
                path: '/invoices/new/:id',
                element: <InvoicesForm key="invoiceCreate"/>
            },
            {
                path: '/invoices/:id',
                element: <Invoices key="invoiceUpdate"/>
            },
            {
                path: '/charts/new/:id',
                element: <ChartsForm key="chartCreate"/>
            },
            {
                path: '/charts/:id',
                element: <Charts key="chartUpdate"/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router;