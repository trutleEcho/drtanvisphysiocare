import { HomeIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface GenericBreadcrumbProps {
  homeHref: string;
  pages: string[];
  pagesHref: string[];
}

export default function GenericBreadcrumb({ props}: {props: GenericBreadcrumbProps}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={props.homeHref}>
            <HomeIcon size={16} aria-hidden="true" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {props.pages.map((page, index) => (
            <>
              <BreadcrumbSeparator> / </BreadcrumbSeparator>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={props.pagesHref[index]}>{page}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
