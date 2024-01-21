import Policy from './Policy/Policy'

import './PrivacyPolicy.css'

function PrivacyPolicy() {
    return (
        <section className="privacy_policy page_padding">
            <div className="container">
                <div>
                    <h4>Privacy Policy </h4>
                    <p className="body_text">
                        We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information. By accessing the Platform or using our Services or otherwise indicating your consent, you agree to, and where required, consent to, the collection, use, and transfer of your information as set out in this policy. This privacy policy: (i) applies only to the aforementioned Platform, and associated concerns, our server provider, and not to websites or applications of any other companies or organizations; and (ii) specifically addresses our obligations pursuant to the laws of Bangladesh.
                    </p>
                </div>
                <Policy
                    number='1. '
                    title='Introduction'
                    description='We are responsible for maintaining and protecting the Personal Information under our control. We have designated an individual or individuals who is/are responsible for compliance with our privacy policy.'
                />
                <Policy
                    number='2. '
                    title='Identifying Purposes'
                    description='We collect, use and disclose Personal Information to provide you with the product or service you have requested and to offer you additional products and services we believe you might be interested in. The purposes for which we collect Personal Information will be identified before or at the time we collect the information. In certain circumstances, the purposes for which information is collected may be clear, and consent may be implied, such as where your name, address and payment information is provided as part of the order process.'
                />
                <Policy
                    number='3. '
                    title='Consent'
                    description='Knowledge and consent are required for the collection, use or disclosure of Personal Information except where required or permitted by law. Providing us with your Personal Information is always your choice. However, your decision not to provide certain information may limit our ability to provide you with our products or services. We will not require you to consent to the collection, use, or disclosure of information as a condition to the supply of a product or service, except as required to be able to supply the product or service.'
                />
                <Policy
                    number='4. '
                    title='Limiting Collection'
                    description='The Personal Information collected will be limited to those details necessary for the purposes identified by us. With your consent, we may collect Personal Information from you in person, over the telephone or by corresponding with you via mail, facsimile, or the Internet.'
                />
                <Policy
                    number='5. '
                    title='Limiting Use, Disclosure and Retention'
                    description='Personal Information may only be used or disclosed for the purpose for which it was collected unless you have otherwise consented, or when it is required or permitted by law. Personal Information will only be retained for the period of time required to fulfill the purpose for which we collected it or as may be required by law. '
                />
                <Policy
                    number='6. '
                    title='Accuracy'
                    description='Personal Information will be maintained in as accurate, complete and up-to-date form as is necessary to fulfill the purposes for which it is to be used.'
                />
                <Policy
                    number='7. '
                    title='Safeguarding Customer Information'
                    description='Personal Information will be protected by security safeguards that are appropriate to the sensitivity level of the information. We take all reasonable precautions to protect your Personal Information from any loss or unauthorized use, access or disclosure.'
                />
                <Policy
                    number='8. '
                    title='Openness'
                    description='We will make information available to you about our policies and practices with respect to the management of your Personal Information.'
                />
                <Policy
                    number='9. '
                    title='Customer Access'
                    description='Upon request, you will be informed of the existence, use and disclosure of your Personal Information, and will be given access to it. You may verify the accuracy and completeness of your Personal Information, and may request that it be amended, if appropriate. However, in certain circumstances permitted by law, we will not disclose certain information to you. For example, we may not disclose information relating to you if other individuals are referenced or if there are legal, security or commercial proprietary restrictions.'
                />
                <Policy
                    number='10. '
                    title='Handling Customer Complaints and Suggestions '
                    description='You may direct any questions or enquiries with respect to our privacy policy or our practices by contacting info@bornilagro.com'
                />
                <div>
                    <h4 style={{paddingTop: '3.2rem'}}>Additional Information</h4>
                </div>
                <div>
                    <h5>Cookies</h5>
                    <p className="body_text">A cookie is a small computer file or piece of information that may be stored in your computer's hard drive when you visit our websites. We may use cookies to improve our website’s functionality and in some cases, to provide visitors with a customized online experience.</p>
                    <p className="body_text">Cookies are widely used and most web browsers are configured initially to accept cookies automatically. You may change your Internet browser settings to prevent your computer from accepting cookies or to notify you when you receive a cookie so that you may decline its acceptance. Please note, however, if you disable cookies, you may not experience optimal performance of our website.</p>
                </div>
                <div>
                    <h5>Other Websites</h5>
                    <p className="body_text">
                        Our website may contain links to other third party sites that are not governed by this privacy policy. Although we endeavour to only link to sites with high privacy standards, our privacy policy will no longer apply once you leave our website. Additionally, we are not responsible for the privacy practices employed by third party websites. Therefore, we suggest that you examine the privacy statements of those sites to learn how your information may be collected, used, shared and disclosed.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy