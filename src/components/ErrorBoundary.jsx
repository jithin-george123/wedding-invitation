import React from 'react';
import { RefreshCw, AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Kayal Wedding ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('kayal_wedding_custom_data');
      localStorage.removeItem('kayal_wedding_wishes');
      localStorage.removeItem('kayal_wedding_rsvps');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-6 text-[#2C241E] font-serif">
          <div className="max-w-lg w-full bg-[#FCFAF7] border border-[#9E7D47]/30 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#9E7D47]/10 flex items-center justify-center mx-auto mb-4 text-[#9E7D47]">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#2C241E] mb-2">
              Wedding Invitation Loading Notice
            </h1>
            <p className="text-sm font-sans text-[#5C5148] mb-4 leading-relaxed">
              The invitation encountered a temporary loading hiccup. You can refresh or restore defaults to continue viewing.
            </p>
            {this.state.error && (
              <pre className="text-left bg-white/80 p-3 rounded-lg text-xs font-mono text-red-700 overflow-x-auto mb-6 border border-red-200">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2A4D45] text-white font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1f3a34] transition-all cursor-pointer shadow-md"
              >
                <RefreshCw size={14} />
                Refresh Invitation
              </button>
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#5C5148]/20 text-[#2C241E] font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#FAF7F0] transition-all cursor-pointer shadow-sm"
              >
                <RotateCcw size={14} />
                Restore Defaults
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

