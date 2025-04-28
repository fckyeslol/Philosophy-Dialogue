import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  MailIcon, 
  PhoneIcon, 
  Loader2, 
  Calendar, 
  GraduationCap, 
  BookOpen 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient } from "@/lib/queryClient";
import { type Student, insertStudentSchema } from "@shared/schema";

// Extended schema with validation for student form
const studentFormSchema = insertStudentSchema.extend({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest" }),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

const StudentsPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: students = [], isLoading } = useQuery<Student[]>({ 
    queryKey: ['/api/students'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      graduationYear: "",
      major: "",
      interests: [],
      isActive: true,
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    try {
      await apiRequest("POST", "/api/students", data);
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      toast({
        title: "Success",
        description: "Student has been added to the repository.",
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student: Student) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(lowerCaseQuery) ||
      student.email.toLowerCase().includes(lowerCaseQuery) ||
      (student.major && student.major.toLowerCase().includes(lowerCaseQuery))
    );
  });

  // Get badge color based on interest
  const getInterestColor = (interest: string) => {
    switch (interest) {
      case "philosophy":
        return "bg-primary/10 text-primary";
      case "debate":
        return "bg-secondary/10 text-secondary";
      case "model-un":
        return "bg-accent/10 text-accent";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format interests for display
  const formatInterests = (interests: string[] | null) => {
    if (!interests || interests.length === 0) return "None";
    
    return (
      <div className="flex flex-wrap gap-1">
        {interests.map((interest) => (
          <Badge key={interest} className={`${getInterestColor(interest)} lowercase`}>
            {interest === "model-un" ? "Model UN" : interest}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Repository</h1>
          <p className="mt-2 text-gray-600">
            A database of club members with their contact information and interests.
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's details to add them to the repository.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="2025" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Philosophy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("philosophy")}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, "philosophy"]
                                      : field.value.filter((v) => v !== "philosophy");
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Philosophy</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("debate")}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, "debate"]
                                      : field.value.filter((v) => v !== "debate");
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Debate</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("model-un")}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, "model-un"]
                                      : field.value.filter((v) => v !== "model-un");
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Model UN</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Active Member</FormLabel>
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-6">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Student
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Directory</CardTitle>
          <CardDescription>
            Browse and manage student information in the club's repository.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <span className="ml-2">Loading students...</span>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Graduation</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: Student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <MailIcon className="h-3.5 w-3.5 text-gray-500 mr-1" />
                            <a href={`mailto:${student.email}`} className="text-primary hover:underline">
                              {student.email}
                            </a>
                          </div>
                          {student.phone && (
                            <div className="flex items-center mt-1">
                              <PhoneIcon className="h-3.5 w-3.5 text-gray-500 mr-1" />
                              {student.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{student.major || "-"}</TableCell>
                      <TableCell>{student.graduationYear || "-"}</TableCell>
                      <TableCell>{formatInterests(student.interests)}</TableCell>
                      <TableCell>
                        <Badge variant={student.isActive ? "default" : "outline"}>
                          {student.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-6 py-3">
          <p className="text-sm text-gray-500">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};


export default StudentsPage;