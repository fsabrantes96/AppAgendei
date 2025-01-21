// import { useContext } from "react";
// import RoutesOpen from "./routesOpen.js";
// import RoutesPrivate from "./routesPrivate";

// import { AuthContext } from "../context/auth.js";



// function Routes() {

//     const { user } = useContext(AuthContext);

//     return user.idUser ? <RoutesPrivate />
//      : <RoutesOpen />
// }

// export default Routes;

import React, { useContext } from "react";
import RoutesOpen from "./routesOpen.js";
import RoutesPrivate from "./routesPrivate.js";
import { AuthContext } from "../context/auth.js";

function Routes() {
    const { user } = useContext(AuthContext);

    return user?.idUser ? <RoutesPrivate /> : <RoutesOpen />;
}

export default Routes;
