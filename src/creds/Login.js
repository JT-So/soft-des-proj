import './loginstyles.css'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="email"> Email: </label>
        <input value={email} type="email" placeholder="Type your email" />
        <label for="password"> Password: </label>
        <input
          value={pass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit"> LOGIN </button>
      </form>
      <button> Don't have an account? Register here.</button>
    </>
  );
};