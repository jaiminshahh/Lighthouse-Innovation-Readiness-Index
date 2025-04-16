
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MiqProvider } from "@/contexts/MiqContext";
import NavBar from "@/components/NavBar";
import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import Results from "@/pages/Results";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MiqProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/results" element={<Results />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </MiqProvider>
  </QueryClientProvider>
);

export default App;
