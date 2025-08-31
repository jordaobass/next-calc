import jsPDF from 'jspdf';
import { RescissionResult } from '@/lib/calculations/rescisao';
import { VacationResult } from '@/lib/calculations/ferias';
import { ThirteenthSalaryResult } from '@/lib/calculations/decimo-terceiro';
import { FGTSResult } from '@/lib/calculations/fgts';
import { formatCurrency } from '@/lib/calculations/utils';

// Configuração do PDF
const PDF_CONFIG = {
  unit: 'mm' as const,
  format: 'a4' as const,
  orientation: 'portrait' as const,
  margins: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
  colors: {
    primary: '#059669', // emerald-600
    secondary: '#374151', // gray-700
    accent: '#3b82f6', // blue-600
    success: '#10b981', // emerald-500
    danger: '#ef4444', // red-500
  },
  fonts: {
    title: 16,
    subtitle: 14,
    body: 10,
    small: 8,
  },
};

class PDFGenerator {
  private pdf: jsPDF;
  private currentY: number;

  constructor() {
    this.pdf = new jsPDF(PDF_CONFIG.orientation, PDF_CONFIG.unit, PDF_CONFIG.format);
    this.currentY = PDF_CONFIG.margins.top;
    this.setupFonts();
  }

  private setupFonts() {
    // Use default fonts available in jsPDF
    this.pdf.setFont('helvetica');
  }

  private addHeader(title: string, subtitle: string) {
    // Logo/Brand area
    this.pdf.setFillColor(5, 150, 105); // emerald-600
    this.pdf.rect(0, 0, 210, 15, 'F');
    
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('CalcTrabalhista.com.br', PDF_CONFIG.margins.left, 10);
    
    // Title
    this.currentY = 25;
    this.pdf.setTextColor(55, 65, 81); // gray-700
    this.pdf.setFontSize(PDF_CONFIG.fonts.title);
    this.pdf.text(title, PDF_CONFIG.margins.left, this.currentY);
    
    // Subtitle
    this.currentY += 10;
    this.pdf.setFontSize(PDF_CONFIG.fonts.subtitle);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(subtitle, PDF_CONFIG.margins.left, this.currentY);
    
    // Date
    this.pdf.setFontSize(PDF_CONFIG.fonts.body);
    const date = new Date().toLocaleDateString('pt-BR');
    this.pdf.text(`Gerado em: ${date}`, PDF_CONFIG.margins.left, this.currentY + 8);
    
    this.currentY += 20;
  }

  private addSection(title: string) {
    this.currentY += 5;
    this.pdf.setFillColor(243, 244, 246); // gray-100
    this.pdf.rect(PDF_CONFIG.margins.left - 2, this.currentY - 3, 170, 8, 'F');
    
    this.pdf.setTextColor(55, 65, 81);
    this.pdf.setFontSize(PDF_CONFIG.fonts.subtitle);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, PDF_CONFIG.margins.left, this.currentY + 2);
    
    this.currentY += 12;
  }

  private addRow(label: string, value: string, isHighlight = false) {
    this.pdf.setFontSize(PDF_CONFIG.fonts.body);
    this.pdf.setFont('helvetica', 'normal');
    
    if (isHighlight) {
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.setTextColor(5, 150, 105); // emerald-600
    } else {
      this.pdf.setTextColor(55, 65, 81); // gray-700
    }
    
    this.pdf.text(label, PDF_CONFIG.margins.left, this.currentY);
    this.pdf.text(value, 120, this.currentY);
    
    this.currentY += 6;
  }

  private addFooter() {
    const pageHeight = this.pdf.internal.pageSize.height;
    const footerY = pageHeight - 15;
    
    this.pdf.setFillColor(243, 244, 246); // gray-100
    this.pdf.rect(0, footerY - 5, 210, 20, 'F');
    
    this.pdf.setTextColor(107, 114, 128); // gray-500
    this.pdf.setFontSize(PDF_CONFIG.fonts.small);
    this.pdf.text('Este documento foi gerado automaticamente pelo CalcTrabalhista.com.br', PDF_CONFIG.margins.left, footerY);
    this.pdf.text('Os valores são baseados na legislação trabalhista brasileira vigente.', PDF_CONFIG.margins.left, footerY + 5);
  }

  private checkPageBreak(requiredSpace = 20) {
    const pageHeight = this.pdf.internal.pageSize.height;
    if (this.currentY + requiredSpace > pageHeight - 30) {
      this.pdf.addPage();
      this.currentY = PDF_CONFIG.margins.top;
    }
  }

  generateRescissionPDF(result: RescissionResult, inputData: any): Blob {
    this.addHeader('Cálculo de Rescisão Trabalhista', 'Relatório detalhado dos valores rescisórios');

    // Dados do trabalhador
    this.addSection('Dados do Trabalhador');
    this.addRow('Salário:', formatCurrency(inputData.salary));
    this.addRow('Data de Admissão:', inputData.admissionDate?.toLocaleDateString('pt-BR') || '');
    this.addRow('Data de Demissão:', inputData.dismissalDate?.toLocaleDateString('pt-BR') || '');
    this.addRow('Tipo de Rescisão:', this.getRescissionTypeLabel(inputData.rescissionType));

    this.checkPageBreak();

    // Valores principais
    this.addSection('Valores da Rescisão');
    this.addRow('Saldo de Salário:', formatCurrency(result.salaryBalance));
    this.addRow('Aviso Prévio:', formatCurrency(result.priorNotice));
    this.addRow('Férias:', formatCurrency(result.vacationValue));
    this.addRow('1/3 sobre Férias:', formatCurrency(result.vacationBonus));
    this.addRow('13º Salário:', formatCurrency(result.thirteenthSalary));
    this.addRow('FGTS:', formatCurrency(result.fgtsWithdrawal));
    this.addRow('Multa 40% FGTS:', formatCurrency(result.fgtsFine));

    this.checkPageBreak();

    // Descontos
    this.addSection('Descontos');
    this.addRow('INSS:', formatCurrency(result.inssDiscount), true);
    this.addRow('IRRF:', formatCurrency(result.irrfDiscount), true);

    this.checkPageBreak();

    // Total
    this.addSection('Resumo Final');
    this.addRow('Total Bruto:', formatCurrency(result.grossTotal), true);
    this.addRow('Total de Descontos:', formatCurrency((result.inssDiscount + result.irrfDiscount)), true);
    this.addRow('VALOR LÍQUIDO A RECEBER:', formatCurrency(result.netTotal), true);

    this.addFooter();
    return this.pdf.output('blob');
  }

  generateVacationPDF(result: VacationResult, inputData: any): Blob {
    this.addHeader('Cálculo de Férias', 'Relatório detalhado do cálculo de férias');

    // Dados do trabalhador
    this.addSection('Dados do Trabalhador');
    this.addRow('Salário:', formatCurrency(inputData.salary));
    this.addRow('Período de Férias:', `${inputData.vacationDays} dias`);
    if (inputData.sellDays > 0) {
      this.addRow('Venda de Férias:', `${inputData.sellDays} dias`);
    }

    this.checkPageBreak();

    // Valores
    this.addSection('Cálculo das Férias');
    this.addRow('Valor das Férias:', formatCurrency(result.vacationValue));
    this.addRow('1/3 Constitucional:', formatCurrency(result.vacationBonus));
    if (result.soldDaysValue > 0) {
      this.addRow('Valor da Venda:', formatCurrency(result.soldDaysValue));
      this.addRow('1/3 sobre Venda:', formatCurrency(result.soldDaysBonus));
    }

    this.checkPageBreak();

    // Descontos
    this.addSection('Descontos');
    this.addRow('INSS:', formatCurrency(result.inssDiscount), true);
    this.addRow('IRRF:', formatCurrency(result.irrfDiscount), true);

    this.checkPageBreak();

    // Total
    this.addSection('Resumo Final');
    this.addRow('Total Bruto:', formatCurrency(result.grossTotal), true);
    this.addRow('Total de Descontos:', formatCurrency((result.inssDiscount + result.irrfDiscount)), true);
    this.addRow('VALOR LÍQUIDO A RECEBER:', formatCurrency(result.netTotal), true);

    this.addFooter();
    return this.pdf.output('blob');
  }

  generateThirteenthSalaryPDF(result: ThirteenthSalaryResult, inputData: any): Blob {
    this.addHeader('Cálculo de 13º Salário', 'Relatório detalhado do décimo terceiro salário');

    // Dados do trabalhador
    this.addSection('Dados do Trabalhador');
    this.addRow('Salário:', formatCurrency(inputData.salary));
    this.addRow('Meses Trabalhados:', `${inputData.workedMonths} meses`);
    this.addRow('Ano de Referência:', inputData.referenceYear?.toString() || '');

    this.checkPageBreak();

    // Valores
    this.addSection('Cálculo do 13º Salário');
    this.addRow('Valor Bruto:', formatCurrency(result.grossValue));
    this.addRow('Dedução Adiantamento:', formatCurrency(result.advanceDeduction));
    this.addRow('Valor Líquido:', formatCurrency(result.netThirteenthSalary));

    this.checkPageBreak();

    // Descontos
    this.addSection('Descontos');
    this.addRow('INSS:', formatCurrency(result.inssDiscount), true);
    this.addRow('IRRF:', formatCurrency(result.irrfDiscount), true);

    this.checkPageBreak();

    // Total
    this.addSection('Resumo Final');
    this.addRow('Total Bruto:', formatCurrency(result.grossValue), true);
    this.addRow('Total de Descontos:', formatCurrency((result.inssDiscount + result.irrfDiscount)), true);
    this.addRow('VALOR LÍQUIDO A RECEBER:', formatCurrency(result.totalToPay || result.netThirteenthSalary), true);

    this.addFooter();
    return this.pdf.output('blob');
  }

  generateFGTSPDF(result: FGTSResult, inputData: any): Blob {
    this.addHeader('Cálculo de FGTS', 'Relatório detalhado do Fundo de Garantia');

    // Dados do trabalhador
    this.addSection('Dados do Trabalhador');
    this.addRow('Salário:', formatCurrency(inputData.salary));
    this.addRow('Data de Admissão:', inputData.admissionDate?.toLocaleDateString('pt-BR') || '');
    this.addRow('Data de Referência:', inputData.referenceDate?.toLocaleDateString('pt-BR') || '');
    this.addRow('Tempo de Serviço:', result.details.serviceTime);

    this.checkPageBreak();

    // Valores do FGTS
    this.addSection('Cálculo do FGTS');
    this.addRow('Depósito Mensal:', formatCurrency(result.monthlyDeposit));
    this.addRow('Total Depositado:', formatCurrency(result.totalDeposits));
    this.addRow('Saldo Atual:', formatCurrency(result.currentBalance));
    this.addRow('Saldo Projetado:', formatCurrency(result.projectedBalance));

    this.checkPageBreak();

    // Simulação de saques
    this.addSection('Simulação de Saques');
    this.addRow('Demissão sem Justa Causa:', formatCurrency(result.withdrawalSimulation.dismissalWithoutCause));
    this.addRow('Acordo Mútuo:', formatCurrency(result.withdrawalSimulation.mutualAgreement));
    this.addRow('Casa Própria:', formatCurrency(result.withdrawalSimulation.homeFinancing));
    this.addRow('Pedido de Demissão:', 'Não pode sacar');

    this.addFooter();
    return this.pdf.output('blob');
  }

  private getRescissionTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'dismissal_without_cause': 'Demissão sem Justa Causa',
      'dismissal_with_cause': 'Demissão por Justa Causa',
      'resignation': 'Pedido de Demissão',
      'mutual_agreement': 'Acordo Mútuo',
      'end_of_contract': 'Fim de Contrato',
    };
    return labels[type] || type;
  }
}

// Funções utilitárias para exportação
export async function exportRescissionPDF(result: RescissionResult, inputData: any) {
  const generator = new PDFGenerator();
  const blob = generator.generateRescissionPDF(result, inputData);
  downloadBlob(blob, 'calculo-rescisao.pdf');
}

export async function exportVacationPDF(result: VacationResult, inputData: any) {
  const generator = new PDFGenerator();
  const blob = generator.generateVacationPDF(result, inputData);
  downloadBlob(blob, 'calculo-ferias.pdf');
}

export async function exportThirteenthSalaryPDF(result: ThirteenthSalaryResult, inputData: any) {
  const generator = new PDFGenerator();
  const blob = generator.generateThirteenthSalaryPDF(result, inputData);
  downloadBlob(blob, 'calculo-decimo-terceiro.pdf');
}

export async function exportFGTSPDF(result: FGTSResult, inputData: any) {
  const generator = new PDFGenerator();
  const blob = generator.generateFGTSPDF(result, inputData);
  downloadBlob(blob, 'calculo-fgts.pdf');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}