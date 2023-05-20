import * as CertificateService from "../service/certification.service.mjs";
import StripeService from "../config/stripe.config.mjs";
import Stripe from "stripe";

export const getCertificates = async (req, res) => {
  try {
    const certificates = await CertificateService.getCertificates({
      limit: req.query.limit,
      skip: req.query.skip,
      page: req.query.page,
      search: req.query.search,
      order: req.query.order,
      sortBy: req.query.sortBy,
    });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const certificate = await CertificateService.getCertificate(req.params.id);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  const certificate = req.body;
  try {
    const newCertificate = await CertificateService.createCertificate(certificate);

    const params = {
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${certificate?.certificate_type?.charAt(0).toUpperCase() + certificate?.certificate_type.slice(1) } Certificate`,
            },
            unit_amount: Math.round(10 * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/user/payment/success`,
      cancel_url: `${req.headers.origin}/user/payment/cancel`,
      currency: "usd",
      customer_email: certificate.email,
      metadata: {
        order: "Certificate",
        orderId: newCertificate._id,
      },
    };
    const session = await StripeService.checkout.sessions.create(params);
    res.status(200).json({
      url: session.url,
      orderId: newCertificate._id,
    });
  } catch (error) {
    console.log("error", error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const deleted = await CertificateService.deleteCertificate(req.params.id);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const updatedCertificate = await CertificateService.updateCertificate(req.params.id, req.body);
    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const completeCertificateOrder = async (req, res) => { 
  try {
    let  upOrder = req.body;
    if (req?.files?.file?.tempFilePath) {
      const uploadedResponse = await uploadFile(req?.files?.file.tempFilePath, req?.files?.file?.name, "project");
      upOrder = { ...req.body, file: uploadedResponse };
    }

    const project = await CertificateService.completeCertificateOrder(req.params.id, upOrder);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};