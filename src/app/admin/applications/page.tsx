"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RefreshCw, CheckCircle, Clock, XCircle, Send, Eye } from 'lucide-react';

interface DestinationLog {
  id: number;
  destination_name: string;
  status: 'success' | 'failed';
  status_code: number | null;
  response_body: string | null;
  error_message: string | null;
  attempted_at: string;
}

interface Application {
  id: number;
  submission_id: string;
  full_name: string;
  phone: string;
  desired_position: string | null;
  status: 'new' | 'processed';
  submitted_at: string;
  language: 'ru' | 'uz' | 'en';
  page_url: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  created_at: string;
  destination_logs: DestinationLog[];
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [resendingId, setResendingId] = useState<number | null>(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: number, newStatus: 'new' | 'processed') => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const resendApplication = async (id: number) => {
    setResendingId(id);
    try {
      const response = await fetch(`/api/applications/${id}/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations: ['horizon_email', 'horizon_webhook']
        })
      });

      if (!response.ok) {
        throw new Error('Failed to resend application');
      }

      // Refresh data to show new logs
      await fetchApplications();
      alert('Application resent successfully');
    } catch (err) {
      console.error('Resend error:', err);
      alert('Failed to resend application');
    } finally {
      setResendingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: 'new' | 'processed') => {
    return status === 'new' ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock className="w-3 h-3 mr-1" />
        New
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle className="w-3 h-3 mr-1" />
        Processed
      </Badge>
    );
  };

  const getDestinationStatusIcon = (status: 'success' | 'failed') => {
    return status === 'success' ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Loading applications...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
            <Button onClick={fetchApplications} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
              <p className="text-gray-600 mt-1">
                Manage job applications and delivery logs
              </p>
            </div>
            <Button onClick={fetchApplications} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {applications.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                New Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {applications.filter(app => app.status === 'new').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {applications.filter(app => app.status === 'processed').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No applications found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => {
                      const successCount = app.destination_logs.filter(
                        log => log.status === 'success'
                      ).length;
                      const totalCount = app.destination_logs.length;

                      return (
                        <TableRow key={app.id}>
                          <TableCell className="whitespace-nowrap">
                            {formatDate(app.submitted_at)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {app.full_name}
                          </TableCell>
                          <TableCell>{app.phone}</TableCell>
                          <TableCell>
                            {app.desired_position || (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {app.language.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${successCount === totalCount ? 'text-green-600' : 'text-amber-600'}`}>
                                {successCount}/{totalCount}
                              </span>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Delivery Logs</DialogTitle>
                                    <DialogDescription>
                                      Application: {app.full_name} ({app.submission_id})
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 mt-4">
                                    {app.destination_logs.map((log) => (
                                      <div
                                        key={log.id}
                                        className="border rounded-lg p-4"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-2">
                                            {getDestinationStatusIcon(log.status)}
                                            <span className="font-semibold">
                                              {log.destination_name}
                                            </span>
                                          </div>
                                          <span className="text-sm text-gray-600">
                                            {formatDate(log.attempted_at)}
                                          </span>
                                        </div>
                                        {log.status_code && (
                                          <p className="text-sm text-gray-600 mb-1">
                                            Status Code: {log.status_code}
                                          </p>
                                        )}
                                        {log.error_message && (
                                          <p className="text-sm text-red-600 mb-1">
                                            Error: {log.error_message}
                                          </p>
                                        )}
                                        {log.response_body && (
                                          <details className="mt-2">
                                            <summary className="text-sm text-gray-600 cursor-pointer">
                                              Response Body
                                            </summary>
                                            <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                                              {log.response_body}
                                            </pre>
                                          </details>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateStatus(
                                    app.id,
                                    app.status === 'new' ? 'processed' : 'new'
                                  )
                                }
                                disabled={updatingId === app.id}
                              >
                                {updatingId === app.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : app.status === 'new' ? (
                                  'Mark Processed'
                                ) : (
                                  'Mark New'
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => resendApplication(app.id)}
                                disabled={resendingId === app.id}
                              >
                                {resendingId === app.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-1" />
                                    Resend
                                  </>
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}