'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Share2, 
  MessageCircle, 
  Mail, 
  Copy, 
  Download, 
  Facebook, 
  Twitter,
  CheckCircle
} from 'lucide-react';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

interface ResultSharingProps {
  title: string;
  description: string;
  value?: string;
  url?: string;
  onExportPDF?: () => void;
  calculatorType: string;
}

export function ResultSharing({ 
  title, 
  description, 
  value, 
  url = window.location.href,
  onExportPDF,
  calculatorType
}: ResultSharingProps) {
  const [copied, setCopied] = useState(false);
  const { trackShare } = useAnalytics();

  const shareText = `${title}\n${description}${value ? `\nResultado: ${value}` : ''}\n\nCalcule o seu: ${url}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    trackShare(calculatorType, 'whatsapp');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${value ? `Resultado: ${value}\n\n` : ''}Calcule o seu em: ${url}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(emailUrl);
    trackShare(calculatorType, 'email');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      trackShare(calculatorType, 'clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    trackShare(calculatorType, 'facebook');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    trackShare(calculatorType, 'twitter');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description + (value ? `\nResultado: ${value}` : ''),
          url: url,
        });
        trackShare(calculatorType, 'native');
      } catch (error) {
        console.error('Erro no compartilhamento nativo:', error);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <Share2 className="h-5 w-5 text-emerald-600" />
              Compartilhe o Resultado
            </h3>
            <p className="text-sm text-muted-foreground">
              Ajude outros trabalhadores conhecendo seus direitos
            </p>
          </div>

          {/* Primary Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-green-50 hover:border-green-200"
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>

            <Button
              onClick={handleEmailShare}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
            >
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="hidden sm:inline">Email</span>
            </Button>

            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-200"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
              <span className="hidden sm:inline">
                {copied ? 'Copiado!' : 'Copiar'}
              </span>
            </Button>

            {onExportPDF && (
              <Button
                onClick={onExportPDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
              >
                <Download className="h-4 w-4 text-red-600" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            )}
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-2">
            <Button
              onClick={handleFacebookShare}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-50"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleTwitterShare}
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:bg-blue-50"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            {typeof navigator !== 'undefined' && navigator.share && (
              <Button
                onClick={handleNativeShare}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Viral Message */}
          <div className="text-center mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Dica:</strong> Compartilhe com seus colegas de trabalho! 
              Conhecer os direitos trabalhistas é fundamental para todos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}