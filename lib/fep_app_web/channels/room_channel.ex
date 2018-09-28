defmodule FepAppWeb.RoomChannel do
  use Phoenix.Channel

  alias FepAppWeb.Presence

  def join("room:lobby", _auth_message, socket) do
    send(self(), :after_join)

    random_number = :rand.uniform(1000)

    user_id = random_number

    {:ok, assign(socket, :user_id, user_id)}
  end

  def handle_info(:after_join, socket) do
    push(socket, "presence_state", Presence.list(socket))

    username = "User #{socket.assigns.user_id}"

    push(socket, "set_username", %{username: username})

    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id, %{
        user_id: socket.assigns.user_id,
        username: username,
        online_at: inspect(System.system_time(:seconds))
      })

    {:noreply, socket}
  end

  def handle_in("new_msg", %{"username" => username, "message" => message}, socket) do
    broadcast(socket, "new_msg", %{username: username, message: message})

    {:noreply, socket}
  end

  def handle_in("new_username", %{"username" => username}, socket) do
    {:ok, _} =
      Presence.update(socket, socket.assigns.user_id, fn meta ->
        Map.put(meta, :username, username)
      end)

    {:reply, :ok, socket}
  end
end
