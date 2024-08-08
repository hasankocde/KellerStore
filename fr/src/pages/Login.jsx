import React from "react";
import LoginForm from "../components/forms/LoginForm";
import GoogleButton from "../components/buttons/GoogleButton";
import FacebookButton from "../components/buttons/FacebookButton";
import TwitterButton from "../components/buttons/TwitterButton";
import Banner from "../components/Banner";
import Logo from "../assets/logo.png";

const Login = () => {
  const title = `Willkommen`;
  const desc = `Verwenden Sie Anmeldeinformationen, um auf Ihr Konto zuzugreifen.`;
  return (
    <div>
      <div>
        <Banner title={title} desc={desc} target={"/allad"} />
      </div>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex  justify-center">
            <div className=" flex justify-center items-center sm:hidden lg:block bg-background-filter-light-blue  w-full p-20 ">
              <div className="flex flex-col items-center ">
                <img src={Logo} alt="Logo" width={120} height={50} />
                <div className="text-white ml-4">
                  <h4 className="text-2xl text-center">
                    Machen Sie Werbung für Ihr Vermögen Kaufen Sie, was Sie
                    brauchen.
                  </h4>
                  <p className="mt-3 text-lg text-center">
                    Größter Online-Werbemarkt der Welt.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
              {/* <div className="flex-1  mt-5  space-y-6 justify-between sm:flex md:space-y-0">
                <div className="mx-4">
                  <GoogleButton />
                </div>
                <div className="mx-4">
                  <FacebookButton />
                </div>
                <div className="mx-4">
                  <TwitterButton />
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-black font-semibold text-center ">Or</h3>
              </div> */}

              <div className="flex justify-center">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
