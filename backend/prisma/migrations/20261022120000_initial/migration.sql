-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "password_hash" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "verification_token_expires_at" TIMESTAMP(3),
    "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
    "lockout_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LmoProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "gazetteOrderRef" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Delhi',
    "districtDivision" TEXT NOT NULL DEFAULT 'North Delhi',
    "zoneSubDivision" TEXT NOT NULL DEFAULT 'Zone 1',
    "assignedJurisdiction" TEXT NOT NULL,
    "dscKeyId" TEXT NOT NULL,
    "phone" TEXT,
    "appointedBy" TEXT,
    "appointedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LmoProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldOfficerProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "designation" TEXT NOT NULL DEFAULT 'Field Verification Inspector',
    "circleZone" TEXT NOT NULL,
    "circlePincode" TEXT NOT NULL DEFAULT '110001',
    "activationToken" TEXT,
    "phone" TEXT,
    "recommendingLmoId" TEXT,
    "recommendingLmoName" TEXT,
    "activatedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldOfficerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatcProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "centre_name" TEXT NOT NULL,
    "gatc_code" TEXT NOT NULL,
    "accreditation_no" TEXT NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "authorized_scopes" TEXT NOT NULL,
    "authorized_categories" TEXT,
    "authorized_state" TEXT DEFAULT 'Delhi',
    "authorized_districts" TEXT DEFAULT 'ALL',
    "authorized_area_type" TEXT DEFAULT 'STATE',
    "authorization_start" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authorization_end" TIMESTAMP(3),
    "is_active_recognition" BOOLEAN NOT NULL DEFAULT true,
    "state" TEXT NOT NULL DEFAULT 'Delhi',
    "district" TEXT NOT NULL DEFAULT 'North Delhi',
    "address" TEXT NOT NULL,
    "lab_head_name" TEXT NOT NULL,
    "phone" TEXT,
    "contact_email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "appointed_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GatcProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "employeeCode" TEXT,
    "clearanceLevel" TEXT NOT NULL DEFAULT 'TIER_1_DIRECTORATE',
    "designation" TEXT NOT NULL DEFAULT 'Super Administrator',
    "phone" TEXT,
    "department" TEXT NOT NULL DEFAULT 'State Directorate of Legal Metrology',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "target" TEXT,
    "details" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "id" TEXT NOT NULL,
    "instrument_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "instrument_type" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT,
    "serial_no" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "accuracy_class" TEXT DEFAULT 'Class III (Medium Accuracy)',
    "location_address" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "current_status" TEXT NOT NULL DEFAULT 'VERIFIED',
    "last_verification_date" TIMESTAMP(3),
    "validity_expiry_date" TIMESTAMP(3),
    "current_certificate_no" TEXT,
    "current_security_seal_no" TEXT,
    "reverification_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "app_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "application_type" TEXT NOT NULL DEFAULT 'INITIAL_VERIFICATION',
    "instrument_id" TEXT,
    "previous_certificate_no" TEXT,
    "instrument_type" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT,
    "serial_no" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "accuracy_class" TEXT DEFAULT 'Class III (Medium Accuracy)',
    "business_name" TEXT NOT NULL,
    "trade_type" TEXT DEFAULT 'Commercial Trader',
    "gst_no" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'Normal',
    "fee_amount" DOUBLE PRECISION NOT NULL DEFAULT 500.0,
    "payment_status" TEXT NOT NULL DEFAULT 'PAID',
    "payment_ref" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "preferred_date" TEXT,
    "preferred_time" TEXT,
    "inspection_mode" TEXT DEFAULT 'ON_SITE',
    "assigned_lmo_id" TEXT,
    "assigned_fo_id" TEXT,
    "assigned_fo_name" TEXT,
    "assigned_fo_code" TEXT,
    "assigned_gatc_id" TEXT,
    "assigned_gatc_name" TEXT,
    "assigned_gatc_code" TEXT,
    "assigned_at" TIMESTAMP(3),
    "scheduled_date" TEXT,
    "scheduled_time" TEXT,
    "inspection_date" TIMESTAMP(3),
    "test_error_percentage" DOUBLE PRECISION,
    "environmental_temp" TEXT,
    "test_readings" TEXT,
    "security_seal_no" TEXT,
    "inspection_notes" TEXT,
    "inspection_result" TEXT,
    "rejection_reason" TEXT,
    "certificate_no" TEXT,
    "certificate_issued_at" TIMESTAMP(3),
    "certificate_valid_until" TIMESTAMP(3),
    "stamped_by" TEXT,
    "rule_set_id" TEXT,
    "rule_version" INTEGER,
    "authority_eligibility_version" TEXT,
    "rule_snapshot" TEXT,
    "legacy_rule_snapshot" BOOLEAN NOT NULL DEFAULT false,
    "preferred_verification_route" TEXT DEFAULT 'NO_PREFERENCE',
    "eligible_authority_types" TEXT DEFAULT 'LMO',
    "category_fields_data" TEXT,
    "selected_category_code" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRecord" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "instrument_id" TEXT,
    "verification_type" TEXT NOT NULL DEFAULT 'INITIAL',
    "verifier_type" TEXT NOT NULL DEFAULT 'FIELD_OFFICER',
    "verifier_id" TEXT,
    "verifier_name" TEXT NOT NULL,
    "verifier_code" TEXT NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_error_percentage" DOUBLE PRECISION,
    "environmental_conditions" TEXT,
    "working_standards_used" TEXT,
    "test_observations" TEXT,
    "result" TEXT NOT NULL,
    "security_seal_no" TEXT,
    "remarks" TEXT,
    "certificate_no" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "application_id" TEXT,
    "user_id" TEXT NOT NULL,
    "doc_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentContent" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "data_base64" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reference_id" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "organization" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstrumentCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parent_category" TEXT,
    "units" TEXT NOT NULL,
    "is_gatc_eligible" BOOLEAN NOT NULL DEFAULT false,
    "applicable_authorities" TEXT NOT NULL DEFAULT 'LMO',
    "field_schema" TEXT,
    "source_document" TEXT,
    "source_rule" TEXT,
    "source_notification" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstrumentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleSet" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL DEFAULT 'CENTRAL',
    "state_code" TEXT,
    "instrument_category_id" TEXT NOT NULL,
    "instrument_subcategory_id" TEXT,
    "verification_type" TEXT NOT NULL DEFAULT 'ALL',
    "version" INTEGER NOT NULL DEFAULT 1,
    "source_document" TEXT NOT NULL,
    "source_reference" TEXT NOT NULL,
    "source_notification" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "priority" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorityEligibility" (
    "id" TEXT NOT NULL,
    "instrument_category_id" TEXT NOT NULL,
    "instrument_subcategory_id" TEXT,
    "authority_type" TEXT NOT NULL,
    "jurisdiction_type" TEXT NOT NULL DEFAULT 'CENTRAL',
    "state_code" TEXT,
    "verification_type" TEXT NOT NULL DEFAULT 'ALL',
    "allowed" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "source_document" TEXT NOT NULL,
    "source_rule" TEXT NOT NULL,
    "source_notification" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthorityEligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidityRule" (
    "id" TEXT NOT NULL,
    "instrument_category_id" TEXT NOT NULL,
    "subcategory" TEXT,
    "verification_type" TEXT NOT NULL DEFAULT 'ALL',
    "initial_verification_period" INTEGER NOT NULL,
    "subsequent_verification_period" INTEGER NOT NULL,
    "period_unit" TEXT NOT NULL DEFAULT 'MONTHS',
    "repair_reverification_behaviour" TEXT NOT NULL DEFAULT 'MANDATORY_FULL_TEST',
    "installation_reverification_behaviour" TEXT NOT NULL DEFAULT 'ON_SITE_CALIBRATION',
    "source_document" TEXT NOT NULL,
    "source_rule" TEXT NOT NULL,
    "source_notification" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidityRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "instrument_category_id" TEXT NOT NULL,
    "verification_type" TEXT NOT NULL DEFAULT 'ALL',
    "document_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "source_document" TEXT,
    "source_rule" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestDefinition" (
    "id" TEXT NOT NULL,
    "instrument_category_id" TEXT NOT NULL,
    "subcategory" TEXT,
    "test_code" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "description" TEXT,
    "verification_type" TEXT NOT NULL DEFAULT 'ALL',
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "input_fields" TEXT,
    "units" TEXT,
    "formula" TEXT,
    "calculation_method" TEXT NOT NULL DEFAULT 'ERROR_PERCENTAGE',
    "max_permissible_error" DOUBLE PRECISION,
    "mpe_rule_text" TEXT,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "source_document" TEXT NOT NULL,
    "source_rule" TEXT NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationChecklistItem" (
    "id" TEXT NOT NULL,
    "instrument_category_id" TEXT NOT NULL,
    "check_code" TEXT NOT NULL,
    "check_name" TEXT NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "source_document" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationTest" (
    "id" TEXT NOT NULL,
    "verification_record_id" TEXT NOT NULL,
    "test_definition_id" TEXT,
    "test_code" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "attempt_number" INTEGER NOT NULL DEFAULT 1,
    "result" TEXT NOT NULL,
    "calculated_error" DOUBLE PRECISION,
    "calculated_percentage_error" DOUBLE PRECISION,
    "maximum_permissible_error" DOUBLE PRECISION,
    "officer_remarks" TEXT,
    "defect_code" TEXT,
    "defect_description" TEXT,
    "repair_required" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationMeasurement" (
    "id" TEXT NOT NULL,
    "verification_test_id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "reference_value" DOUBLE PRECISION NOT NULL,
    "observed_value" DOUBLE PRECISION NOT NULL,
    "indicated_value" DOUBLE PRECISION,
    "unit" TEXT NOT NULL,
    "raw_reading" TEXT NOT NULL,
    "calculated_error" DOUBLE PRECISION NOT NULL,
    "calculated_percentage_error" DOUBLE PRECISION NOT NULL,
    "maximum_permissible_error" DOUBLE PRECISION NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LmoProfile_user_id_key" ON "LmoProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "LmoProfile_employeeCode_key" ON "LmoProfile"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "LmoProfile_dscKeyId_key" ON "LmoProfile"("dscKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldOfficerProfile_user_id_key" ON "FieldOfficerProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "FieldOfficerProfile_employeeCode_key" ON "FieldOfficerProfile"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "GatcProfile_user_id_key" ON "GatcProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GatcProfile_gatc_code_key" ON "GatcProfile"("gatc_code");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_user_id_key" ON "AdminProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_employeeCode_key" ON "AdminProfile"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_instrument_id_key" ON "Instrument"("instrument_id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_app_number_key" ON "Application"("app_number");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentContent_document_id_key" ON "DocumentContent"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_user_id_key" ON "UserProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "InstrumentCategory_code_key" ON "InstrumentCategory"("code");

-- AddForeignKey
ALTER TABLE "LmoProfile" ADD CONSTRAINT "LmoProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldOfficerProfile" ADD CONSTRAINT "FieldOfficerProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatcProfile" ADD CONSTRAINT "GatcProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRecord" ADD CONSTRAINT "VerificationRecord_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRecord" ADD CONSTRAINT "VerificationRecord_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentContent" ADD CONSTRAINT "DocumentContent_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSet" ADD CONSTRAINT "RuleSet_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorityEligibility" ADD CONSTRAINT "AuthorityEligibility_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidityRule" ADD CONSTRAINT "ValidityRule_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestDefinition" ADD CONSTRAINT "TestDefinition_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationChecklistItem" ADD CONSTRAINT "VerificationChecklistItem_instrument_category_id_fkey" FOREIGN KEY ("instrument_category_id") REFERENCES "InstrumentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationTest" ADD CONSTRAINT "VerificationTest_verification_record_id_fkey" FOREIGN KEY ("verification_record_id") REFERENCES "VerificationRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationMeasurement" ADD CONSTRAINT "VerificationMeasurement_verification_test_id_fkey" FOREIGN KEY ("verification_test_id") REFERENCES "VerificationTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
