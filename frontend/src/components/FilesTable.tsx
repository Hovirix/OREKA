import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileInfo {
  file_name: string;
  file_type: string;
  processed_at: string;
  record_count?: number;
}

interface FilesTableProps {
  files: FileInfo[];
}

export const FilesTable = ({ files }: FilesTableProps) => {
  if (files.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Processed Files
          </CardTitle>
          <CardDescription>No files have been processed yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Processed Files
        </CardTitle>
        <CardDescription>History of uploaded and processed files</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Processed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    {file.file_name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={file.file_type === 'csv' ? 'default' : 'secondary'}>
                    {file.file_type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{file.record_count || 'N/A'}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(file.processed_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
