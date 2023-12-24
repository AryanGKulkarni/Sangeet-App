import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Link from "next/link"; // Import Link from Next.js

interface MCardProps {
  title: string;
  // Define other props here if needed
}

export const MCard: React.FC<MCardProps> = (props) => {
  const categoryPath = `/classes/${props.title}`;
  return (
    <Link href={categoryPath}>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">{props.title}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>
    </Link>
  );
}
