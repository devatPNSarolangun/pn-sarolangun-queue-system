"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p>Loading...</p>;

  // return (
  //   <main style={{ padding: "20px" }}>
  //     <h1>Users</h1>
  //     <ul>
  //       {users.map((user) => (
  //         <li key={user.id}>
  //           {user.name} ({user.email})
  //         </li>
  //       ))}
  //     </ul>
  //   </main>
  // );
}
