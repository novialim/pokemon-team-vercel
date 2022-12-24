import Search from "~/components/Search";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="pb-2">Welcome to Pokemon Team</h1>
      <Search />
    </div>
  );
}
