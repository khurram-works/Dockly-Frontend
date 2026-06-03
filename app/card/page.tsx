import {Card, CardHeader, CardFooter} from "@/components/ui/card";

export default function CardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Card Title</h2>
        </CardHeader>
        <div className="p-4">
          <p>This is the content of the card. It can include text, images, or any other elements.</p>
        </div>
        <CardFooter>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Action</button>
        </CardFooter>
      </Card>
    </div>
  );
} 