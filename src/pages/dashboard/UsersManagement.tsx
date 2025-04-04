import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, MoreHorizontal, Plus, Shield, ShieldOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const users = [
  {
    id: "user_1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "",
    role: "Admin",
    status: "Active",
    lastActive: "2025-04-02T10:30:00",
    dateCreated: "2023-05-15T14:22:00",
  },
  {
    id: "user_2",
    name: "Samantha Davis",
    email: "samantha@example.com",
    avatar: "",
    role: "Admin",
    status: "Active",
    lastActive: "2025-04-01T16:45:00",
    dateCreated: "2023-06-22T11:10:00",
  },
  {
    id: "user_3",
    name: "Marcus Chen",
    email: "marcus@example.com",
    avatar: "",
    role: "Manager",
    status: "Active",
    lastActive: "2025-04-02T09:15:00",
    dateCreated: "2023-08-05T09:30:00",
  },
  {
    id: "user_4",
    name: "Priya Patel",
    email: "priya@example.com",
    avatar: "",
    role: "Support",
    status: "Active",
    lastActive: "2025-03-28T14:20:00",
    dateCreated: "2024-01-18T10:45:00",
  },
  {
    id: "user_5",
    name: "David Wilson",
    email: "david@example.com",
    avatar: "",
    role: "Support",
    status: "Inactive",
    lastActive: "2025-02-15T11:10:00",
    dateCreated: "2023-11-02T13:15:00",
  },
  {
    id: "user_6",
    name: "Sophia Lee",
    email: "sophia@example.com",
    avatar: "",
    role: "Manager",
    status: "Active",
    lastActive: "2025-04-01T15:30:00",
    dateCreated: "2024-02-28T15:30:00",
  },
  {
    id: "user_7",
    name: "James Rodriguez",
    email: "james@example.com",
    avatar: "",
    role: "Support",
    status: "Active",
    lastActive: "2025-03-30T16:15:00",
    dateCreated: "2023-07-10T09:20:00",
  },
  {
    id: "user_8",
    name: "Emma Brown",
    email: "emma@example.com",
    avatar: "",
    role: "Manager",
    status: "Active",
    lastActive: "2025-03-29T13:40:00",
    dateCreated: "2023-09-05T14:10:00",
  },
  {
    id: "user_9",
    name: "Noah Taylor",
    email: "noah@example.com",
    avatar: "",
    role: "Support",
    status: "Inactive",
    lastActive: "2025-02-20T15:20:00",
    dateCreated: "2024-01-20T10:35:00",
  },
  {
    id: "user_10",
    name: "Olivia White",
    email: "olivia@example.com",
    avatar: "",
    role: "Support",
    status: "Active",
    lastActive: "2025-03-31T10:05:00",
    dateCreated: "2023-10-10T13:50:00",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Manager":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Support":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Users Management | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Manage admin users, assign roles, and control access permissions.
            </p>
          </div>
          <Button className="md:w-auto" onClick={() => setIsAddUserOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={`mr-1.5 h-2 w-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      {user.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(user.lastActive).split(',')[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {user.status === "Active" ? (
                            <>
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Shield className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(user.id)}>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage === 1 ? (
                  <Button variant="ghost" size="icon" disabled>
                    <span className="sr-only">Previous page</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                      <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                ) : (
                  <PaginationPrevious href="#" onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.max(1, currentPage - 1));
                  }} />
                )}
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  if (currentPage > totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  }
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                {currentPage === totalPages ? (
                  <Button variant="ghost" size="icon" disabled>
                    <span className="sr-only">Next page</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                      <path d="M6.15803 3.13514C6.35949 2.94628 6.67591 2.95648 6.86477 3.15794L10.6148 7.15794C10.7951 7.35027 10.7951 7.64955 10.6148 7.84188L6.86477 11.8419C6.67591 12.0433 6.35949 12.0535 6.15803 11.8647C5.95657 11.6758 5.94637 11.3594 6.13523 11.1579L9.56464 7.49991L6.13523 3.84188C5.94637 3.64042 5.95657 3.32401 6.15803 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                ) : (
                  <PaginationNext href="#" onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.min(totalPages, currentPage + 1));
                  }} />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new admin user account and assign access permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" placeholder="Enter email address" type="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Select role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="send-invite"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="send-invite" className="text-sm font-medium">
                    Send invitation email
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsAddUserOpen(false);
              }}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  console.log(`Deleting user: ${selectedUserId}`);
                  setIsDeleteDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UsersManagement;
