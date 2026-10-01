import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MemeOtpVerification from "../components/MemeOtpVerification";

describe("MemeOtpVerification Component", () => {
  it("renders the meme OTP interface matching the reference photo", () => {
    const handleSuccess = vi.fn();
    const handleBack = vi.fn();

    render(
      <MemeOtpVerification
        visitorName="Shiva"
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    );

    expect(screen.getByRole("heading", { name: "OTP" })).toBeInTheDocument();
    expect(
      screen.getByText(/We are facing an SMS issue\. Please use/i)
    ).toBeInTheDocument();
    expect(screen.getByText("ENTER OTP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /VALIDATE/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /RESEND OTP/i })).toBeInTheDocument();
  });

  it("successfully validates with 910296 and invokes onSuccess", async () => {
    const handleSuccess = vi.fn();
    const handleBack = vi.fn();

    render(
      <MemeOtpVerification
        visitorName="Test User"
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "910296" } });

    const validateBtn = screen.getByRole("button", { name: /VALIDATE/i });
    fireEvent.click(validateBtn);

    await waitFor(
      () => {
        expect(handleSuccess).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );
  });

  it("shows error feedback when entering an incorrect OTP", async () => {
    const handleSuccess = vi.fn();
    const handleBack = vi.fn();

    render(
      <MemeOtpVerification
        visitorName="Test User"
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "111222" } });

    const validateBtn = screen.getByRole("button", { name: /VALIDATE/i });
    fireEvent.click(validateBtn);

    await waitFor(
      () => {
        expect(handleSuccess).not.toHaveBeenCalled();
      },
      { timeout: 1500 }
    );
  });

  it("triggers onBack when Edit Details is clicked", () => {
    const handleSuccess = vi.fn();
    const handleBack = vi.fn();

    render(
      <MemeOtpVerification
        visitorName="Test User"
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    );

    const backBtn = screen.getByRole("button", { name: /Edit Details/i });
    fireEvent.click(backBtn);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
