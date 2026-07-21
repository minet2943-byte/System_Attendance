import api from "./api";

const authService = {
    // Login API
    login: async (email, password) => {

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        const data = response.data;

        if (data.token) {
            localStorage.setItem(
                "token",
                data.token
            );
        }

        if (data.user) {
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            return data.user;
        }


        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        return data;
    },

    // Register API
    register: async (
        name,
        email,
        password,
        role
    ) => {

        const response = await api.post(
            "/auth/register",
            {
                name,
                email,
                password,
                role
            }
        );
        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        return response.data;
    },


    // Logout
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },


    // Get current user
    getCurrentUser: () => {

        const user = localStorage.getItem("user");

        if(user){
            return JSON.parse(user);
        }

        return null;
    }
};


export default authService;