import ForgotPasswordForm from "../components/ForgotPasswordForm.component";

const ForgotPassword = () => {
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://img.freepik.com/premium-vector/forgot-password-account-login-web-page-protection-security-key-access-system-smartphone-computer-flat-vector-illustration_2175-1396.jpg?w=2000"
              className="w-full"
              alt="ForgotPassword"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="hero container max-w-screen-lg mx-auto pb-10">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IVkhcVJpjizWZRNBr666ih_JbFQeVKwugXMLNEKD3I7lhAsauKLHpABvkMOIkPI_Q0g&usqp=CAU"
                className="mx-auto w-48"
                alt="ForgotPassword"
              />
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
