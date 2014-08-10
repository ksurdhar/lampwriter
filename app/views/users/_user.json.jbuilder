json.(user, :username, :id, :email)

json.notes(user.notes) do |note|
  json.partial!("notes/note", :note => note)
end