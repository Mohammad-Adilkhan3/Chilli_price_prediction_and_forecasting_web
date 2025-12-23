import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Database,
  RefreshCw,
  Upload,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Brain,
  AlertCircle,
  Download
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ModelInfo {
  name: string;
  exists: boolean;
  size?: string;
  modified?: string;
}

interface DatasetInfo {
  exists: boolean;
  size?: string;
  modified?: string;
  path?: string;
}

interface TrainingStatus {
  is_training: boolean;
  current_step: string;
  progress: number;
  message: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

interface DatasetStatus {
  is_generating: boolean;
  progress: number;
  message: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | null>(null);
  const [datasetStatus, setDatasetStatus] = useState<DatasetStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [backendConnected, setBackendConnected] = useState(true);

  // Fetch model info
  const fetchModelInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/model-info`);
      if (!response.ok) throw new Error('Failed to fetch model info');
      const data = await response.json();
      setModelInfo(data);
      setBackendConnected(true);
    } catch (error) {
      console.error('Error fetching model info:', error);
      setBackendConnected(false);
    }
  };

  // Fetch training status
  const fetchTrainingStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/training-status`);
      const data = await response.json();
      setTrainingStatus(data);
    } catch (error) {
      console.error('Error fetching training status:', error);
    }
  };

  // Fetch dataset status
  const fetchDatasetStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/dataset-status`);
      const data = await response.json();
      setDatasetStatus(data);
    } catch (error) {
      console.error('Error fetching dataset status:', error);
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchModelInfo(),
        fetchTrainingStatus(),
        fetchDatasetStatus()
      ]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Poll for status updates when training or generating
  useEffect(() => {
    const interval = setInterval(() => {
      if (trainingStatus?.is_training || datasetStatus?.is_generating) {
        fetchTrainingStatus();
        fetchDatasetStatus();
        fetchModelInfo();
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [trainingStatus?.is_training, datasetStatus?.is_generating]);

  // Generate dataset
  const handleGenerateDataset = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/generate-dataset`, {
        method: 'POST'
      });

      if (!response.ok) {
        let errorMessage = 'Failed to start dataset generation';
        try {
          const error = await response.json();
          errorMessage = error.detail || errorMessage;
        } catch {
          errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      toast({
        title: 'Dataset Generation Started',
        description: 'Generating 500,000 samples. This will take 2-3 minutes.',
      });

      // Start polling
      fetchDatasetStatus();
    } catch (error: any) {
      console.error('Generate dataset error:', error);
      
      let errorMessage = error.message;
      
      // Check for network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        errorMessage = 'Cannot connect to backend server. Please ensure the backend is running at ' + API_BASE_URL;
        setBackendConnected(false);
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  // Train models
  const handleTrainModels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/train-models`, {
        method: 'POST'
      });

      if (!response.ok) {
        let errorMessage = 'Failed to start training';
        try {
          const error = await response.json();
          errorMessage = error.detail || errorMessage;
        } catch {
          errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      toast({
        title: 'Model Training Started',
        description: 'Training Random Forest, XGBoost, and Linear Regression. This will take 5-10 minutes.',
      });

      // Start polling
      fetchTrainingStatus();
    } catch (error: any) {
      console.error('Train models error:', error);
      
      let errorMessage = error.message;
      
      // Check for network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        errorMessage = 'Cannot connect to backend server. Please ensure the backend is running at ' + API_BASE_URL;
        setBackendConnected(false);
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  // Upload dataset
  const handleUploadDataset = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid File',
        description: 'Please upload a CSV file',
        variant: 'destructive'
      });
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/admin/upload-dataset`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const error = await response.json();
          errorMessage = error.detail || errorMessage;
        } catch {
          errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      toast({
        title: 'Dataset Uploaded',
        description: `${result.filename} (${result.size}) uploaded successfully`,
      });

      setBackendConnected(true);
      fetchModelInfo();
    } catch (error: any) {
      console.error('Upload error:', error);
      
      let errorMessage = error.message;
      
      // Check for network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        errorMessage = 'Cannot connect to backend server. Please ensure the backend is running at ' + API_BASE_URL;
        setBackendConnected(false);
      }
      
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setUploadingFile(false);
      event.target.value = '';
    }
  };

  // Delete models
  const handleDeleteModels = async () => {
    if (!confirm('Are you sure you want to delete all trained models?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/delete-models`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Delete failed');
      }

      const result = await response.json();

      toast({
        title: 'Models Deleted',
        description: result.message,
      });

      fetchModelInfo();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  // Delete dataset
  const handleDeleteDataset = async () => {
    if (!confirm('Are you sure you want to delete the dataset?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/delete-dataset`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Delete failed');
      }

      toast({
        title: 'Dataset Deleted',
        description: 'Dataset file has been removed',
      });

      fetchModelInfo();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage datasets and train ML models
          </p>
        </div>

        {/* Backend Connection Status */}
        {!backendConnected && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">Cannot connect to backend server</p>
              <p className="text-sm mt-1">
                Please ensure the backend is running at <code className="bg-destructive/20 px-1 py-0.5 rounded">{API_BASE_URL}</code>
              </p>
              <p className="text-sm mt-2">
                To start the backend: <code className="bg-destructive/20 px-1 py-0.5 rounded">cd backend && python quick_start.py</code>
              </p>
            </AlertDescription>
          </Alert>
        )}
        
        {backendConnected && modelInfo && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <p className="font-medium text-green-700 dark:text-green-400">Backend server connected successfully</p>
              <p className="text-sm mt-1 text-green-600 dark:text-green-500">
                API endpoint: <code className="bg-green-500/20 px-1 py-0.5 rounded">{API_BASE_URL}</code>
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Dataset Status */}
        {datasetStatus?.is_generating && (
          <Alert>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">{datasetStatus.message}</p>
                <Progress value={datasetStatus.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Started: {datasetStatus.started_at ? new Date(datasetStatus.started_at).toLocaleTimeString() : 'N/A'}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {datasetStatus?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">Dataset Generation Failed</p>
              <p className="text-sm mt-1">{datasetStatus.error}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Training Status */}
        {trainingStatus?.is_training && (
          <Alert>
            <Brain className="h-4 w-4 animate-pulse" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">{trainingStatus.message}</p>
                <p className="text-sm text-muted-foreground">Step: {trainingStatus.current_step}</p>
                <Progress value={trainingStatus.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Started: {trainingStatus.started_at ? new Date(trainingStatus.started_at).toLocaleTimeString() : 'N/A'}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {trainingStatus?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">Training Failed</p>
              <p className="text-sm mt-1">{trainingStatus.error}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dataset Management */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Dataset Management
              </CardTitle>
              <CardDescription>
                Generate or upload training dataset (500,000 samples)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dataset Info */}
              {modelInfo?.dataset?.exists ? (
                <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dataset Status</span>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{modelInfo.dataset.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Modified:</span>
                      <span className="font-medium">
                        {new Date(modelInfo.dataset.modified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No dataset found. Generate or upload a dataset to train models.
                  </AlertDescription>
                </Alert>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleGenerateDataset}
                  disabled={datasetStatus?.is_generating || trainingStatus?.is_training}
                  className="w-full"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${datasetStatus?.is_generating ? 'animate-spin' : ''}`} />
                  Generate Dataset (500K samples)
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleUploadDataset}
                    disabled={uploadingFile || datasetStatus?.is_generating || trainingStatus?.is_training}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="dataset-upload"
                  />
                  <Button
                    variant="outline"
                    disabled={uploadingFile || datasetStatus?.is_generating || trainingStatus?.is_training}
                    className="w-full"
                    asChild
                  >
                    <label htmlFor="dataset-upload" className="cursor-pointer">
                      <Upload className={`w-4 h-4 mr-2 ${uploadingFile ? 'animate-pulse' : ''}`} />
                      Upload Custom Dataset (.csv)
                    </label>
                  </Button>
                </div>

                {modelInfo?.dataset?.exists && (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteDataset}
                    disabled={datasetStatus?.is_generating || trainingStatus?.is_training}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Dataset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Model Training */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Model Training
              </CardTitle>
              <CardDescription>
                Train ML models with enhanced hyperparameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Models Info */}
              <div className="space-y-2">
                {modelInfo?.models && Object.entries(modelInfo.models).map(([key, model]: [string, any]) => (
                  <div key={key} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{model.name}</span>
                      </div>
                      {model.exists ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Trained
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="w-3 h-3" />
                          Not Trained
                        </Badge>
                      )}
                    </div>
                    {model.exists && (
                      <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <div>Size: {model.size}</div>
                        <div>Modified: {new Date(model.modified).toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Last Updated */}
              {modelInfo?.last_updated && (
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(modelInfo.last_updated).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleTrainModels}
                  disabled={!modelInfo?.dataset?.exists || trainingStatus?.is_training || datasetStatus?.is_generating}
                  className="w-full"
                >
                  <Brain className={`w-4 h-4 mr-2 ${trainingStatus?.is_training ? 'animate-pulse' : ''}`} />
                  Train All Models (10-15 min)
                </Button>

                {modelInfo?.models && Object.values(modelInfo.models).some((m: any) => m.exists) && (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteModels}
                    disabled={trainingStatus?.is_training || datasetStatus?.is_generating}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All Models
                  </Button>
                )}
              </div>

              {!modelInfo?.dataset?.exists && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Dataset required. Generate or upload a dataset first.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Training Configuration Info */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Training Configuration</CardTitle>
            <CardDescription>
              Enhanced hyperparameters for maximum accuracy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Random Forest</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 200 estimators</li>
                  <li>• Max depth: 25</li>
                  <li>• Expected accuracy: 98.5%+</li>
                  <li>• Training time: 4-6 min</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">XGBoost</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 200 estimators</li>
                  <li>• Max depth: 12</li>
                  <li>• Expected accuracy: 98.0%+</li>
                  <li>• Training time: 3-4 min</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Linear Regression</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ridge regularization</li>
                  <li>• Feature scaling</li>
                  <li>• Expected accuracy: 90%+</li>
                  <li>• Training time: 1 min</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <div>
                  <p className="font-medium">Generate or Upload Dataset</p>
                  <p className="text-muted-foreground">
                    Click "Generate Dataset" to create 500,000 training samples (2-3 minutes) or upload your own CSV file.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div>
                  <p className="font-medium">Train Models</p>
                  <p className="text-muted-foreground">
                    Click "Train All Models" to train Random Forest, XGBoost, and Linear Regression (10-15 minutes).
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div>
                  <p className="font-medium">Start Predicting</p>
                  <p className="text-muted-foreground">
                    Once training is complete, the models will be ready for price predictions with 98.5%+ accuracy.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
