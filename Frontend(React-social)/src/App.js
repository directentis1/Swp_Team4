import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserRoutes } from "./routes";
import { AdminRoutes } from "./routes";
import { useEffect } from "react";
import axios from "axios";

export const ApplicationContext = React.createContext([]);

function App() {
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    console.log(jwt);
    axios
      .get("http://localhost:8080/api/banner/listBanner")
      .then((response) => {
        const activeBanners = response.data
          .filter((banner) => banner.active == 1)
          .map((banner) => {
            return { id: banner.bannerid, content: banner.picture };
          });
        setBanners(activeBanners);
      })
      .catch((error) => console.log(error));

    if (jwt != null) {
      axios
        .get("http://localhost:8080/api/user/currentUser", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          localStorage.setItem("token", response.data.user.token);
          setUser(response.data.user);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [banners, setBanners] = React.useState([]);

  const [user, setUser] = React.useState([]);

  const makeSignIn = (user) => {
    setUser(user);
  };
  const makeSignOut = () => {
    localStorage.removeItem("token");
    setUser([]);
  };

  return (
    <ApplicationContext.Provider
      value={{ user, setUser, makeSignIn, makeSignOut, banners, setBanners }}
    >
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            {UserRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;

              if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {AdminRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;

              if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }

                  // element={
                  //   user.roleID == 1 && route.isProtected ? ( // Check if user is authenticated
                  //     <Layout>
                  //       <Page />
                  //     </Layout>
                  //   ) : (
                  //     <Navigate to="/" /> // Redirect to login page if user is not authenticated
                  //   )
                  // }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </ApplicationContext.Provider>
  );
}

export default App;
