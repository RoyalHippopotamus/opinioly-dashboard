<script>
  import { goto } from "$app/navigation"
  import { createClient } from "@supabase/supabase-js"
  import { redirect } from "@sveltejs/kit"

  const supabaseUrl = "https://foebhsyjevotvveomyop.supabase.co"
  //This key is safe to expose on the client
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZWJoc3lqZXZvdHZ2ZW9teW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNzA2ODYsImV4cCI6MjAxMjk0NjY4Nn0.scxVcnN2Q1Gx2cK38o-zn4sdUAy21Z63pRwaphbVLO0"
  const supabase = createClient(supabaseUrl, supabaseKey)

  let email = "pontus@zetterberg.io"
  let password = "qew123w2"

  async function handleRegister() {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (response.ok) {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        if (err) {
          goto("/login")
        } else throw redirect(303, "/dashboard")
      }
    } catch (error) {}
  }
</script>

<main>
  <div class="form__container">
    <form action="?/register" method="POST">
      <h1>Sign up</h1>
      <div class="form__item">
        <label for="email">Email</label>
        <input
          class="form__input"
          required
          type="email"
          id="email"
          name="email"
          bind:value={email}
        />
      </div>

      <div class="form__item">
        <label for="password">Password </label>
        <input
          class="form__input"
          required
          name="password"
          type="password"
          id="password"
          bind:value={password}
        />
      </div>

      <button class="submit">Sign up</button>
    </form>
    <span class="login__redirect"
      >Already got an account? <a href="/login">Login here</a></span
    >
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
    position: relative;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 1em;
    }
  }
  .form__container {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px;
    width: 400px;
    height: 500px;
    background-color: #fcfcfc;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  h1 {
    margin-bottom: 0.5em;
  }
  .form__item {
    display: flex;
    flex-direction: column;
  }
  .form__input {
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 0px;
    border-color: lightgrey;
    background: #ffffff;
    height: 45px;
    padding: 5px;
    transition: border-color ease-in 150ms;
    border-radius: var(--border-radius);
    font-size: 14px;
  }
  label {
    font-weight: 600;
    align-self: start;
    margin-bottom: 0.2em;
  }
  input:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
    outline: transparent;
  }
  .submit {
    all: unset;
    width: 100%;
    color: var(--primary-button-text, black);
    background-color: var(--primary-button, #c2ebd1);
    height: 45px;
    border-radius: var(--border-radius);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color ease-in 150ms,
      opacity ease-in 150ms;
    text-align: center;
    min-height: 45px;
    transition: scale ease-in 150ms;
    &:hover {
      background-color: var(--primary-button, #c2ebd1);
      opacity: 0.85;
    }
    &:disabled {
      background-color: var(--primary-button, #c2ebd1);
      opacity: 0.3;
      cursor: not-allowed;
    }
    &:active:not(:disabled) {
      scale: 1.02;
    }
  }
  .login__redirect {
    text-align: center;

    a {
      opacity: 1;
      color: rgb(22, 22, 22);
      font-weight: 600;
    }
  }
</style>
