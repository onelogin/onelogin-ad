/**
 *  AD internal attributes
 *  --------------------------
 *  userAttrs: AD user attributes
 */

const adAttrs = {
    user: {
        writable: [
            'AccountExpirationDate',
            'accountExpires',
            'AccountLockoutTime',
            'AccountNotDelegated',
            'adminCount',
            'AllowReversiblePasswordEncryption',
            'AuthenticationPolicy',
            'AuthenticationPolicySilo',
            'badPasswordTime',
            'badPwdCount',
            'CannotChangePassword',
            'Certificates',
            'City',
            'cn',
            'codePage',
            'Company',
            'CompoundIdentitySupported',
            'Country',
            'countryCode',
            'Department',
            'Description',
            'DisplayName',
            'DistinguishedName',
            'Division',
            'DoesNotRequirePreAuth',
            'EmailAddress',
            'EmployeeID',
            'EmployeeNumber',
            'Enabled',
            'Fax',
            'GivenName',
            'HomeDirectory',
            'HomedirRequired',
            'HomeDrive',
            'HomePage',
            'HomePhone',
            'Initials',
            'isCriticalSystemObject',
            'KerberosEncryptionType',
            'lastLogoff',
            'lastLogon',
            'lastLogonTimestamp',
            'LockedOut',
            'lockoutTime',
            'logonCount',
            'logonHours',
            'LogonWorkstations',
            'mail',
            'Manager',
            'MNSLogonAccount',
            'MobilePhone',
            'nTSecurityDescriptor',
            'ObjectClass',
            'ObjectGUID',
            'Office',
            'OfficePhone',
            'Organization',
            'OtherName',
            'PasswordExpired',
            'PasswordLastSet',
            'PasswordNeverExpires',
            'PasswordNotRequired',
            'POBox',
            'PostalCode',
            'primaryGroupID',
            'PrincipalsAllowedToDelegateToAccount',
            'ProfilePath',
            'ProtectedFromAccidentalDeletion',
            'pwdLastSet',
            'SamAccountName',
            'sAMAccountType',
            'ScriptPath',
            'ServicePrincipalNames',
            'SID',
            'SmartcardLogonRequired',
            'State',
            'StreetAddress',
            'Surname',
            'sn',
            'Title',
            'TrustedForDelegation',
            'TrustedToAuthForDelegation',
            'unicodePwd',
            'UseDESKeyOnly',
            'userAccountControl',
            'userCertificate',
            'UserPrincipalName'
        ],
        all: [
            'accountExpires',
            'accountNameHistory',
            'aCSPolicyName',
            'adminCount',
            'adminDescription',
            'adminDisplayName',
            'allowedAttributes',
            'allowedAttributesEffective',
            'allowedChildClasses',
            'allowedChildClassesEffective',
            'altSecurityIdentities',
            'assistant',
            'badPasswordTime',
            'badPwdCount',
            'bridgeheadServerListBL',
            'c',
            'canonicalName',
            'cn',
            'co',
            'codePage',
            'comment',
            'company',
            'controlAccessRights',
            'countryCode',
            'createTimeStamp',
            'dBCSPwd',
            'defaultClassStore',
            'department',
            'description',
            'desktopProfile',
            'destinationIndicator',
            'directReports',
            'displayName',
            'displayNamePrintable',
            'distinguishedName',
            'division',
            'dSASignature',
            'dSCorePropagationData',
            'dynamicLDAPServer',
            'employeeID',
            'employeeNumber',
            'extensionName',
            'facsimileTelephoneNumber',
            'flags',
            'fromEntry',
            'frsComputerReferenceBL',
            'fRSMemberReferenceBL',
            'fSMORoleOwner',
            'garbageCollPeriod',
            'generationQualifier',
            'givenName',
            'groupMembershipSAM',
            'groupPriority',
            'groupsToIgnore',
            'homeDirectory',
            'homeDrive',
            'homePhone',
            'homePostalAddress',
            'info',
            'initials',
            'instanceType',
            'internationalISDNNumber',
            'ipPhone',
            'isCriticalSystemObject',
            'isDeleted',
            'isPrivilegeHolder',
            'l',
            'lastKnownParent',
            'lastLogoff',
            'lastLogon',
            'legacyExchangeDN',
            'lmPwdHistory',
            'localeID',
            'lockoutTime',
            'logonCount',
            'logonHours',
            'logonWorkstation',
            'mail',
            'managedObjects',
            'manager',
            'masteredBy',
            'maxStorage',
            'memberOf',
            'mhsORAddress',
            'middleName',
            'mobile',
            'modifyTimeStamp',
            'mS-DS-ConsistencyChildCount',
            'mS-DS-ConsistencyGuid',
            'mS-DS-CreatorSID',
            'mSMQDigests',
            'mSMQDigestsMig',
            'mSMQSignCertificates',
            'mSMQSignCertificatesMig',
            'msNPAllowDialin',
            'msNPCallingStationID',
            'msNPSavedCallingStationID',
            'msRADIUSCallbackNumber',
            'msRADIUSFramedIPAddress',
            'msRADIUSFramedRoute',
            'msRADIUSServiceType',
            'msRASSavedCallbackNumber',
            'msRASSavedFramedIPAddress',
            'msRASSavedFramedRoute',
            'name',
            'netbootSCPBL',
            'networkAddress',
            'nonSecurityMemberBL',
            'ntPwdHistory',
            'nTSecurityDescriptor',
            'o',
            'objectCategory',
            'objectClass',
            'objectGUID',
            'objectSid',
            'objectVersion',
            'operatorCount',
            'otherFacsimileTelephoneNumber',
            'otherHomePhone',
            'otherIpPhone',
            'otherLoginWorkstations',
            'otherMailbox',
            'otherMobile',
            'otherPager',
            'otherTelephone',
            'otherWellKnownObjects',
            'ou',
            'pager',
            'partialAttributeDeletionList',
            'partialAttributeSet',
            'personalTitle',
            'physicalDeliveryOfficeName',
            'possibleInferiors',
            'postalAddress',
            'postalCode',
            'postOfficeBox',
            'preferredDeliveryMethod',
            'preferredOU',
            'primaryGroupID',
            'primaryInternationalISDNNumber',
            'primaryTelexNumber',
            'profilePath',
            'proxiedObjectName',
            'proxyAddresses',
            'pwdLastSet',
            'queryPolicyBL',
            'registeredAddress',
            'replPropertyMetaData',
            'replUpToDateVector',
            'repsFrom',
            'repsTo',
            'revision',
            'rid',
            'sAMAccountName',
            'sAMAccountType',
            'scriptPath',
            'sDRightsEffective',
            'securityIdentifier',
            'seeAlso',
            'serverReferenceBL',
            'servicePrincipalName',
            'showInAddressBook',
            'showInAdvancedViewOnly',
            'sIDHistory',
            'siteObjectBL',
            'sn',
            'st',
            'street',
            'streetAddress',
            'subRefs',
            'subSchemaSubEntry',
            'supplementalCredentials',
            'systemFlags',
            'telephoneNumber',
            'teletexTerminalIdentifier',
            'telexNumber',
            'terminalServer',
            'textEncodedORAddress',
            'thumbnailLogo',
            'thumbnailPhoto',
            'title',
            'tokenGroups',
            'tokenGroupsGlobalAndUniversal',
            'tokenGroupsNoGCAcceptable',
            'unicodePwd',
            'url',
            'userAccountControl',
            'userCert',
            'userCertificate',
            'userParameters',
            'userPassword',
            'userPrincipalName',
            'userSharedFolder',
            'userSharedFolderOther',
            'userSMIMECertificate',
            'userWorkstations',
            'uSNChanged',
            'uSNCreated',
            'uSNDSALastObjRemoved',
            'USNIntersite',
            'uSNLastObjRem',
            'uSNSource',
            'wbemPath',
            'wellKnownObjects',
            'whenChanged',
            'whenCreated',
            'wWWHomePage',
            'x121Address'
        ]
    }
};

module.exports = adAttrs;
