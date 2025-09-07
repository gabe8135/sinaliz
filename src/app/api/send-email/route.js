import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_UeS726Pc_MGWcyMtomUknB6P7ebD2DKKs");

export async function POST(req) {
  try {
    const { name, email, company, message, phone, subject } = await req.json();

    // Mapeamento de assuntos para títulos mais amigáveis
    const subjectMap = {
      contato: "Contato Geral",
      projeto: "Novo Projeto",
      parceria: "Proposta de Parceria",
      suporte: "Solicitação de Suporte",
      outro: "Outro Assunto",
    };

    // Template HTML do e-mail (mantém o visual do portfólio)
    const htmlTemplate = `
      <body style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fff 100%); padding: 0; margin: 0; font-family: 'Inter', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fff 100%); min-height: 100vh; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width: 520px; background: #fff; border-radius: 18px; box-shadow: 0 8px 32px 0 rgba(80, 70, 229, 0.10); border: 1px solid #ede9fe; overflow: hidden;">
                <tr>
                  <td style="background: linear-gradient(90deg, #1e3a8a 0%, #6d28d9 50%, #111827 100%); position: relative; padding: 32px 32px 16px 32px; text-align: center;">
                    <div style='position:absolute; inset:0; background:rgba(0,0,0,0.20); border-radius:18px;'></div>
                    <div style='position:relative; z-index:2;'>
                      <h2 style="margin: 0; color: #fff; font-size: 1.5rem; font-weight: 700; letter-spacing: -1px; text-shadow: 0 2px 8px #0002;">Nova mensagem via Portfólio</h2>
                      <p style="margin: 8px 0 0 0; color: #c7d2fe; font-size: 1rem; font-weight: 500; text-shadow: 0 1px 4px #0002;">${subjectMap[subject] || subject || "Contato via site"}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px;">
                    <div style="margin-bottom: 18px;">
                      <span style="display: block; color: #5b21b6; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">Nome</span>
                      <span style="color: #1e293b; font-size: 1.1rem; font-weight: 500;">${name}</span>
                    </div>
                    <div style="margin-bottom: 18px;">
                      <span style="display: block; color: #5b21b6; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">E-mail</span>
                      <span style="color: #1e293b; font-size: 1.1rem; font-weight: 500;">${email}</span>
                    </div>
                    ${company ? `<div style=\"margin-bottom: 18px;\"><span style=\"display: block; color: #5b21b6; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;\">Empresa</span><span style=\"color: #1e293b; font-size: 1.1rem; font-weight: 500;\">${company}</span></div>` : ""}
                    ${phone ? `<div style=\"margin-bottom: 18px;\"><span style=\"display: block; color: #5b21b6; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;\">Telefone</span><span style=\"color: #1e293b; font-size: 1.1rem; font-weight: 500;\">${phone}</span></div>` : ""}
                    <div style="margin-bottom: 18px;">
                      <span style="display: block; color: #5b21b6; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">Mensagem</span>
                      <div style="color: #1e293b; font-size: 1.08rem; font-weight: 400; background: #ede9fe; border-radius: 10px; padding: 16px; margin-top: 4px;">${message}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background: linear-gradient(90deg, #1e3a8a 0%, #6d28d9 50%, #111827 100%); position: relative; padding: 18px 32px; text-align: center; border-top: 1px solid #ede9fe;">
                    <div style='position:absolute; inset:0; background:rgba(0,0,0,0.20); border-radius:18px;'></div>
                    <div style='position:relative; z-index:2;'>
                      <span style="color: #fff; font-size: 0.95rem; font-weight: 500; text-shadow: 0 2px 8px #0002;">Portfólio Gabriel Ramos • <a href="https://vempracacapp.com" style="color: #c7d2fe; text-decoration: underline;">vempracacapp.com</a></span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `;

    // Texto plano para fallback
    const textTemplate = `
      Formulário preenchido no site:\n\n
      Nome: ${name}
      Email: ${email}
      ${company ? `Empresa: ${company}` : ""}
      ${phone ? `Telefone: ${phone}` : ""}
      Assunto: ${subjectMap[subject] || subject || "Contato via site"}
      \nMensagem:\n${message}
    `;

    const response = await resend.emails.send({
      from: "Formulário Site <onboarding@resend.dev>",
      to: "ramos.analista@gmail.com",
      subject: `Formulário do Site: ${subjectMap[subject] || subject || "Contato via site"} - ${name}`,
      html: htmlTemplate,
      replyTo: email,
      text: textTemplate,
      headers: {
        Importance: "high",
        "X-Priority": "1 (Highest)",
        "X-MSMail-Priority": "High",
      },
    });
    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
