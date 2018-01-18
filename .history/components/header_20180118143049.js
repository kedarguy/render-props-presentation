import Link from "next/link";
import { Button } from "reactbulma";

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

function Header() {
  let exampleNumbers = [];

  for (var i = 1; i <= 5; i++) {
    exampleNumbers.push(i);
  }
  return (
    <div>
      <h1>Render props presentation</h1>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <h5>examples:</h5>
      {exampleNumbers.map(number => (
        <Link href={`/example${number}`}>
          <Button>Example {number}</Button>
        </Link>
      ))}
    </div>
  );
}

export default Header;
