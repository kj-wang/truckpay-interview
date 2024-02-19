import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false);
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            Users
            testing
        </div>
    )
};

export default Users;