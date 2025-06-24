import { JSX } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (items: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  handlePageChange,
  handleItemsPerPageChange,
}: PaginationControlsProps): JSX.Element {
  return (
    <div className="mt-4 flex w-full gap-4 items-center">
      <Select
        onValueChange={(e) => handleItemsPerPageChange(Number(e))}
        defaultValue="10"
      >
        <SelectTrigger className="selected-shadow">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${currentPage === 1 && "hidden"} hover-shadow`}
            />
          </PaginationItem>

          {currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
                className={`hover:bg-breaker-bay-100 ${
                  i + 1 === currentPage ? "selected-shadow" : "hover-shadow"
                }`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${
                currentPage === totalPages && "hidden"
              } hover-shadow`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
