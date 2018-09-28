defmodule FepApp.Repo do
  use Ecto.Repo,
    otp_app: :fep_app,
    adapter: Ecto.Adapters.Postgres
end
