import { useState, useEffect } from "react";
import { DollarSign, Receipt, TrendingUp, Users, BarChart3 } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { FileUpload } from "@/components/FileUpload";
import { RevenueChart } from "@/components/RevenueChart";
import { FilesTable } from "@/components/FilesTable";
import { useToast } from "@/hooks/use-toast";

interface DashboardData {
  summary?: {
    revenue_total?: number;
    revenue_by_area?: Record<string, number>;
    revenue_by_payment?: Record<string, number>;
    receipt_count?: number;
    average_receipt?: number;
    discount_rate?: number;
  };
  all_files?: Array<{
    file_name: string;
    file_type: string;
    processed_at: string;
    record_count?: number;
  }>;
}

const Index = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch dashboard');
      const data = await response.json();
      setDashboardData(data.dashboard || {});
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to backend. Make sure the FastAPI server is running on port 8000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const summary = dashboardData.summary || {};
  const files = dashboardData.all_files || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Oreka</h1>
                <p className="text-xs text-muted-foreground">Restaurant Management System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground">
            Track your restaurant's performance and KPIs in real-time
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            title="Total Revenue"
            value={summary.revenue_total ? `$${Number(summary.revenue_total).toLocaleString()}` : '$0'}
            icon={DollarSign}
            subtitle="Across all areas"
          />
          <KPICard
            title="Receipts"
            value={summary.receipt_count || 0}
            icon={Receipt}
            subtitle="Total transactions"
          />
          <KPICard
            title="Average Receipt"
            value={summary.average_receipt ? `$${Number(summary.average_receipt).toFixed(2)}` : '$0'}
            icon={TrendingUp}
            subtitle="Per transaction"
          />
          <KPICard
            title="Discount Rate"
            value={summary.discount_rate ? `${(Number(summary.discount_rate) * 100).toFixed(2)}%` : 'N/A'}
            icon={Users}
            subtitle="Applied discounts"
          />
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onUploadSuccess={fetchDashboard} />
        </div>

        {/* Charts */}
        {summary.revenue_by_area && (
          <div className="mb-8">
            <RevenueChart data={summary} />
          </div>
        )}

        {/* Files Table */}
        <FilesTable files={files} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Oreka © {new Date().getFullYear()} - Professional Restaurant Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
