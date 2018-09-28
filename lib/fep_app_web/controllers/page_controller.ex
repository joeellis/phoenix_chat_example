defmodule FepAppWeb.PageController do
  use FepAppWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
